package com.fu.capstone.web.rest;

import com.fu.capstone.CtsmicroserviceApp;

import com.fu.capstone.domain.ReceiptImage;
import com.fu.capstone.repository.ReceiptImageRepository;
import com.fu.capstone.service.ReceiptImageService;
import com.fu.capstone.service.dto.ReceiptImageDTO;
import com.fu.capstone.service.mapper.ReceiptImageMapper;
import com.fu.capstone.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.fu.capstone.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ReceiptImageResource REST controller.
 *
 * @see ReceiptImageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CtsmicroserviceApp.class)
public class ReceiptImageResourceIntTest {

    private static final Long DEFAULT_RECEIPT_NOTE_ID = 1L;
    private static final Long UPDATED_RECEIPT_NOTE_ID = 2L;

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ReceiptImageRepository receiptImageRepository;

    @Autowired
    private ReceiptImageMapper receiptImageMapper;
    
    @Autowired
    private ReceiptImageService receiptImageService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReceiptImageMockMvc;

    private ReceiptImage receiptImage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReceiptImageResource receiptImageResource = new ReceiptImageResource(receiptImageService);
        this.restReceiptImageMockMvc = MockMvcBuilders.standaloneSetup(receiptImageResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReceiptImage createEntity(EntityManager em) {
        ReceiptImage receiptImage = new ReceiptImage()
            .receiptNoteId(DEFAULT_RECEIPT_NOTE_ID)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE)
            .createDate(DEFAULT_CREATE_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return receiptImage;
    }

    @Before
    public void initTest() {
        receiptImage = createEntity(em);
    }

    @Test
    @Transactional
    public void createReceiptImage() throws Exception {
        int databaseSizeBeforeCreate = receiptImageRepository.findAll().size();

        // Create the ReceiptImage
        ReceiptImageDTO receiptImageDTO = receiptImageMapper.toDto(receiptImage);
        restReceiptImageMockMvc.perform(post("/api/receipt-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptImageDTO)))
            .andExpect(status().isCreated());

        // Validate the ReceiptImage in the database
        List<ReceiptImage> receiptImageList = receiptImageRepository.findAll();
        assertThat(receiptImageList).hasSize(databaseSizeBeforeCreate + 1);
        ReceiptImage testReceiptImage = receiptImageList.get(receiptImageList.size() - 1);
        assertThat(testReceiptImage.getReceiptNoteId()).isEqualTo(DEFAULT_RECEIPT_NOTE_ID);
        assertThat(testReceiptImage.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testReceiptImage.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testReceiptImage.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testReceiptImage.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createReceiptImageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = receiptImageRepository.findAll().size();

        // Create the ReceiptImage with an existing ID
        receiptImage.setId(1L);
        ReceiptImageDTO receiptImageDTO = receiptImageMapper.toDto(receiptImage);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReceiptImageMockMvc.perform(post("/api/receipt-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptImageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ReceiptImage in the database
        List<ReceiptImage> receiptImageList = receiptImageRepository.findAll();
        assertThat(receiptImageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllReceiptImages() throws Exception {
        // Initialize the database
        receiptImageRepository.saveAndFlush(receiptImage);

        // Get all the receiptImageList
        restReceiptImageMockMvc.perform(get("/api/receipt-images?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(receiptImage.getId().intValue())))
            .andExpect(jsonPath("$.[*].receiptNoteId").value(hasItem(DEFAULT_RECEIPT_NOTE_ID.intValue())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getReceiptImage() throws Exception {
        // Initialize the database
        receiptImageRepository.saveAndFlush(receiptImage);

        // Get the receiptImage
        restReceiptImageMockMvc.perform(get("/api/receipt-images/{id}", receiptImage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(receiptImage.getId().intValue()))
            .andExpect(jsonPath("$.receiptNoteId").value(DEFAULT_RECEIPT_NOTE_ID.intValue()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReceiptImage() throws Exception {
        // Get the receiptImage
        restReceiptImageMockMvc.perform(get("/api/receipt-images/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReceiptImage() throws Exception {
        // Initialize the database
        receiptImageRepository.saveAndFlush(receiptImage);

        int databaseSizeBeforeUpdate = receiptImageRepository.findAll().size();

        // Update the receiptImage
        ReceiptImage updatedReceiptImage = receiptImageRepository.findById(receiptImage.getId()).get();
        // Disconnect from session so that the updates on updatedReceiptImage are not directly saved in db
        em.detach(updatedReceiptImage);
        updatedReceiptImage
            .receiptNoteId(UPDATED_RECEIPT_NOTE_ID)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .createDate(UPDATED_CREATE_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        ReceiptImageDTO receiptImageDTO = receiptImageMapper.toDto(updatedReceiptImage);

        restReceiptImageMockMvc.perform(put("/api/receipt-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptImageDTO)))
            .andExpect(status().isOk());

        // Validate the ReceiptImage in the database
        List<ReceiptImage> receiptImageList = receiptImageRepository.findAll();
        assertThat(receiptImageList).hasSize(databaseSizeBeforeUpdate);
        ReceiptImage testReceiptImage = receiptImageList.get(receiptImageList.size() - 1);
        assertThat(testReceiptImage.getReceiptNoteId()).isEqualTo(UPDATED_RECEIPT_NOTE_ID);
        assertThat(testReceiptImage.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testReceiptImage.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testReceiptImage.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testReceiptImage.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingReceiptImage() throws Exception {
        int databaseSizeBeforeUpdate = receiptImageRepository.findAll().size();

        // Create the ReceiptImage
        ReceiptImageDTO receiptImageDTO = receiptImageMapper.toDto(receiptImage);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReceiptImageMockMvc.perform(put("/api/receipt-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptImageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ReceiptImage in the database
        List<ReceiptImage> receiptImageList = receiptImageRepository.findAll();
        assertThat(receiptImageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReceiptImage() throws Exception {
        // Initialize the database
        receiptImageRepository.saveAndFlush(receiptImage);

        int databaseSizeBeforeDelete = receiptImageRepository.findAll().size();

        // Get the receiptImage
        restReceiptImageMockMvc.perform(delete("/api/receipt-images/{id}", receiptImage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReceiptImage> receiptImageList = receiptImageRepository.findAll();
        assertThat(receiptImageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReceiptImage.class);
        ReceiptImage receiptImage1 = new ReceiptImage();
        receiptImage1.setId(1L);
        ReceiptImage receiptImage2 = new ReceiptImage();
        receiptImage2.setId(receiptImage1.getId());
        assertThat(receiptImage1).isEqualTo(receiptImage2);
        receiptImage2.setId(2L);
        assertThat(receiptImage1).isNotEqualTo(receiptImage2);
        receiptImage1.setId(null);
        assertThat(receiptImage1).isNotEqualTo(receiptImage2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReceiptImageDTO.class);
        ReceiptImageDTO receiptImageDTO1 = new ReceiptImageDTO();
        receiptImageDTO1.setId(1L);
        ReceiptImageDTO receiptImageDTO2 = new ReceiptImageDTO();
        assertThat(receiptImageDTO1).isNotEqualTo(receiptImageDTO2);
        receiptImageDTO2.setId(receiptImageDTO1.getId());
        assertThat(receiptImageDTO1).isEqualTo(receiptImageDTO2);
        receiptImageDTO2.setId(2L);
        assertThat(receiptImageDTO1).isNotEqualTo(receiptImageDTO2);
        receiptImageDTO1.setId(null);
        assertThat(receiptImageDTO1).isNotEqualTo(receiptImageDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(receiptImageMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(receiptImageMapper.fromId(null)).isNull();
    }
}
