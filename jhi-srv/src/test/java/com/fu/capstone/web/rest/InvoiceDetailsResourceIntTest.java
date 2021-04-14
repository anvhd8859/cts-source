package com.fu.capstone.web.rest;

import com.fu.capstone.CtsmicroserviceApp;

import com.fu.capstone.domain.InvoiceDetails;
import com.fu.capstone.repository.InvoiceDetailsRepository;
import com.fu.capstone.service.InvoiceDetailsService;
import com.fu.capstone.service.dto.InvoiceDetailsDTO;
import com.fu.capstone.service.mapper.InvoiceDetailsMapper;
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
 * Test class for the InvoiceDetailsResource REST controller.
 *
 * @see InvoiceDetailsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CtsmicroserviceApp.class)
public class InvoiceDetailsResourceIntTest {

    private static final Long DEFAULT_INVOICE_HEADER_ID = 1L;
    private static final Long UPDATED_INVOICE_HEADER_ID = 2L;

    private static final String DEFAULT_ITEM_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ITEM_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ITEM_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_ITEM_TYPE = "BBBBBBBBBB";

    private static final Float DEFAULT_WEIGHT = 1F;
    private static final Float UPDATED_WEIGHT = 2F;

    private static final Float DEFAULT_HEIGHT = 1F;
    private static final Float UPDATED_HEIGHT = 2F;

    private static final Float DEFAULT_LENGTH = 1F;
    private static final Float UPDATED_LENGTH = 2F;

    private static final Float DEFAULT_WIDTH = 1F;
    private static final Float UPDATED_WIDTH = 2F;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_ORIGIN_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_ORIGIN_IMAGE = "BBBBBBBBBB";

    private static final String DEFAULT_DAMAGES_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_DAMAGES_IMAGE = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private InvoiceDetailsRepository invoiceDetailsRepository;

    @Autowired
    private InvoiceDetailsMapper invoiceDetailsMapper;
    
    @Autowired
    private InvoiceDetailsService invoiceDetailsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInvoiceDetailsMockMvc;

    private InvoiceDetails invoiceDetails;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InvoiceDetailsResource invoiceDetailsResource = new InvoiceDetailsResource(invoiceDetailsService);
        this.restInvoiceDetailsMockMvc = MockMvcBuilders.standaloneSetup(invoiceDetailsResource)
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
    public static InvoiceDetails createEntity(EntityManager em) {
        InvoiceDetails invoiceDetails = new InvoiceDetails()
            .invoiceHeaderId(DEFAULT_INVOICE_HEADER_ID)
            .itemName(DEFAULT_ITEM_NAME)
            .itemType(DEFAULT_ITEM_TYPE)
            .weight(DEFAULT_WEIGHT)
            .height(DEFAULT_HEIGHT)
            .length(DEFAULT_LENGTH)
            .width(DEFAULT_WIDTH)
            .description(DEFAULT_DESCRIPTION)
            .originImage(DEFAULT_ORIGIN_IMAGE)
            .damagesImage(DEFAULT_DAMAGES_IMAGE)
            .createDate(DEFAULT_CREATE_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return invoiceDetails;
    }

    @Before
    public void initTest() {
        invoiceDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createInvoiceDetails() throws Exception {
        int databaseSizeBeforeCreate = invoiceDetailsRepository.findAll().size();

        // Create the InvoiceDetails
        InvoiceDetailsDTO invoiceDetailsDTO = invoiceDetailsMapper.toDto(invoiceDetails);
        restInvoiceDetailsMockMvc.perform(post("/api/invoice-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoiceDetailsDTO)))
            .andExpect(status().isCreated());

        // Validate the InvoiceDetails in the database
        List<InvoiceDetails> invoiceDetailsList = invoiceDetailsRepository.findAll();
        assertThat(invoiceDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        InvoiceDetails testInvoiceDetails = invoiceDetailsList.get(invoiceDetailsList.size() - 1);
        assertThat(testInvoiceDetails.getInvoiceHeaderId()).isEqualTo(DEFAULT_INVOICE_HEADER_ID);
        assertThat(testInvoiceDetails.getItemName()).isEqualTo(DEFAULT_ITEM_NAME);
        assertThat(testInvoiceDetails.getItemType()).isEqualTo(DEFAULT_ITEM_TYPE);
        assertThat(testInvoiceDetails.getWeight()).isEqualTo(DEFAULT_WEIGHT);
        assertThat(testInvoiceDetails.getHeight()).isEqualTo(DEFAULT_HEIGHT);
        assertThat(testInvoiceDetails.getLength()).isEqualTo(DEFAULT_LENGTH);
        assertThat(testInvoiceDetails.getWidth()).isEqualTo(DEFAULT_WIDTH);
        assertThat(testInvoiceDetails.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testInvoiceDetails.getOriginImage()).isEqualTo(DEFAULT_ORIGIN_IMAGE);
        assertThat(testInvoiceDetails.getDamagesImage()).isEqualTo(DEFAULT_DAMAGES_IMAGE);
        assertThat(testInvoiceDetails.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testInvoiceDetails.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createInvoiceDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = invoiceDetailsRepository.findAll().size();

        // Create the InvoiceDetails with an existing ID
        invoiceDetails.setId(1L);
        InvoiceDetailsDTO invoiceDetailsDTO = invoiceDetailsMapper.toDto(invoiceDetails);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInvoiceDetailsMockMvc.perform(post("/api/invoice-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoiceDetailsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the InvoiceDetails in the database
        List<InvoiceDetails> invoiceDetailsList = invoiceDetailsRepository.findAll();
        assertThat(invoiceDetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInvoiceDetails() throws Exception {
        // Initialize the database
        invoiceDetailsRepository.saveAndFlush(invoiceDetails);

        // Get all the invoiceDetailsList
        restInvoiceDetailsMockMvc.perform(get("/api/invoice-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(invoiceDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].invoiceHeaderId").value(hasItem(DEFAULT_INVOICE_HEADER_ID.intValue())))
            .andExpect(jsonPath("$.[*].itemName").value(hasItem(DEFAULT_ITEM_NAME.toString())))
            .andExpect(jsonPath("$.[*].itemType").value(hasItem(DEFAULT_ITEM_TYPE.toString())))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].height").value(hasItem(DEFAULT_HEIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].length").value(hasItem(DEFAULT_LENGTH.doubleValue())))
            .andExpect(jsonPath("$.[*].width").value(hasItem(DEFAULT_WIDTH.doubleValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].originImage").value(hasItem(DEFAULT_ORIGIN_IMAGE.toString())))
            .andExpect(jsonPath("$.[*].damagesImage").value(hasItem(DEFAULT_DAMAGES_IMAGE.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getInvoiceDetails() throws Exception {
        // Initialize the database
        invoiceDetailsRepository.saveAndFlush(invoiceDetails);

        // Get the invoiceDetails
        restInvoiceDetailsMockMvc.perform(get("/api/invoice-details/{id}", invoiceDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(invoiceDetails.getId().intValue()))
            .andExpect(jsonPath("$.invoiceHeaderId").value(DEFAULT_INVOICE_HEADER_ID.intValue()))
            .andExpect(jsonPath("$.itemName").value(DEFAULT_ITEM_NAME.toString()))
            .andExpect(jsonPath("$.itemType").value(DEFAULT_ITEM_TYPE.toString()))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT.doubleValue()))
            .andExpect(jsonPath("$.height").value(DEFAULT_HEIGHT.doubleValue()))
            .andExpect(jsonPath("$.length").value(DEFAULT_LENGTH.doubleValue()))
            .andExpect(jsonPath("$.width").value(DEFAULT_WIDTH.doubleValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.originImage").value(DEFAULT_ORIGIN_IMAGE.toString()))
            .andExpect(jsonPath("$.damagesImage").value(DEFAULT_DAMAGES_IMAGE.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInvoiceDetails() throws Exception {
        // Get the invoiceDetails
        restInvoiceDetailsMockMvc.perform(get("/api/invoice-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInvoiceDetails() throws Exception {
        // Initialize the database
        invoiceDetailsRepository.saveAndFlush(invoiceDetails);

        int databaseSizeBeforeUpdate = invoiceDetailsRepository.findAll().size();

        // Update the invoiceDetails
        InvoiceDetails updatedInvoiceDetails = invoiceDetailsRepository.findById(invoiceDetails.getId()).get();
        // Disconnect from session so that the updates on updatedInvoiceDetails are not directly saved in db
        em.detach(updatedInvoiceDetails);
        updatedInvoiceDetails
            .invoiceHeaderId(UPDATED_INVOICE_HEADER_ID)
            .itemName(UPDATED_ITEM_NAME)
            .itemType(UPDATED_ITEM_TYPE)
            .weight(UPDATED_WEIGHT)
            .height(UPDATED_HEIGHT)
            .length(UPDATED_LENGTH)
            .width(UPDATED_WIDTH)
            .description(UPDATED_DESCRIPTION)
            .originImage(UPDATED_ORIGIN_IMAGE)
            .damagesImage(UPDATED_DAMAGES_IMAGE)
            .createDate(UPDATED_CREATE_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        InvoiceDetailsDTO invoiceDetailsDTO = invoiceDetailsMapper.toDto(updatedInvoiceDetails);

        restInvoiceDetailsMockMvc.perform(put("/api/invoice-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoiceDetailsDTO)))
            .andExpect(status().isOk());

        // Validate the InvoiceDetails in the database
        List<InvoiceDetails> invoiceDetailsList = invoiceDetailsRepository.findAll();
        assertThat(invoiceDetailsList).hasSize(databaseSizeBeforeUpdate);
        InvoiceDetails testInvoiceDetails = invoiceDetailsList.get(invoiceDetailsList.size() - 1);
        assertThat(testInvoiceDetails.getInvoiceHeaderId()).isEqualTo(UPDATED_INVOICE_HEADER_ID);
        assertThat(testInvoiceDetails.getItemName()).isEqualTo(UPDATED_ITEM_NAME);
        assertThat(testInvoiceDetails.getItemType()).isEqualTo(UPDATED_ITEM_TYPE);
        assertThat(testInvoiceDetails.getWeight()).isEqualTo(UPDATED_WEIGHT);
        assertThat(testInvoiceDetails.getHeight()).isEqualTo(UPDATED_HEIGHT);
        assertThat(testInvoiceDetails.getLength()).isEqualTo(UPDATED_LENGTH);
        assertThat(testInvoiceDetails.getWidth()).isEqualTo(UPDATED_WIDTH);
        assertThat(testInvoiceDetails.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testInvoiceDetails.getOriginImage()).isEqualTo(UPDATED_ORIGIN_IMAGE);
        assertThat(testInvoiceDetails.getDamagesImage()).isEqualTo(UPDATED_DAMAGES_IMAGE);
        assertThat(testInvoiceDetails.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testInvoiceDetails.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingInvoiceDetails() throws Exception {
        int databaseSizeBeforeUpdate = invoiceDetailsRepository.findAll().size();

        // Create the InvoiceDetails
        InvoiceDetailsDTO invoiceDetailsDTO = invoiceDetailsMapper.toDto(invoiceDetails);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInvoiceDetailsMockMvc.perform(put("/api/invoice-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoiceDetailsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the InvoiceDetails in the database
        List<InvoiceDetails> invoiceDetailsList = invoiceDetailsRepository.findAll();
        assertThat(invoiceDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInvoiceDetails() throws Exception {
        // Initialize the database
        invoiceDetailsRepository.saveAndFlush(invoiceDetails);

        int databaseSizeBeforeDelete = invoiceDetailsRepository.findAll().size();

        // Get the invoiceDetails
        restInvoiceDetailsMockMvc.perform(delete("/api/invoice-details/{id}", invoiceDetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<InvoiceDetails> invoiceDetailsList = invoiceDetailsRepository.findAll();
        assertThat(invoiceDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InvoiceDetails.class);
        InvoiceDetails invoiceDetails1 = new InvoiceDetails();
        invoiceDetails1.setId(1L);
        InvoiceDetails invoiceDetails2 = new InvoiceDetails();
        invoiceDetails2.setId(invoiceDetails1.getId());
        assertThat(invoiceDetails1).isEqualTo(invoiceDetails2);
        invoiceDetails2.setId(2L);
        assertThat(invoiceDetails1).isNotEqualTo(invoiceDetails2);
        invoiceDetails1.setId(null);
        assertThat(invoiceDetails1).isNotEqualTo(invoiceDetails2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(InvoiceDetailsDTO.class);
        InvoiceDetailsDTO invoiceDetailsDTO1 = new InvoiceDetailsDTO();
        invoiceDetailsDTO1.setId(1L);
        InvoiceDetailsDTO invoiceDetailsDTO2 = new InvoiceDetailsDTO();
        assertThat(invoiceDetailsDTO1).isNotEqualTo(invoiceDetailsDTO2);
        invoiceDetailsDTO2.setId(invoiceDetailsDTO1.getId());
        assertThat(invoiceDetailsDTO1).isEqualTo(invoiceDetailsDTO2);
        invoiceDetailsDTO2.setId(2L);
        assertThat(invoiceDetailsDTO1).isNotEqualTo(invoiceDetailsDTO2);
        invoiceDetailsDTO1.setId(null);
        assertThat(invoiceDetailsDTO1).isNotEqualTo(invoiceDetailsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(invoiceDetailsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(invoiceDetailsMapper.fromId(null)).isNull();
    }
}
