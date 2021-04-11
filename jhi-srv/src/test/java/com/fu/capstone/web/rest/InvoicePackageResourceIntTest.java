package com.fu.capstone.web.rest;

import com.fu.capstone.CtsmicroserviceApp;

import com.fu.capstone.domain.InvoicePackage;
import com.fu.capstone.repository.InvoicePackageRepository;
import com.fu.capstone.service.InvoicePackageService;
import com.fu.capstone.service.dto.InvoicePackageDTO;
import com.fu.capstone.service.mapper.InvoicePackageMapper;
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
 * Test class for the InvoicePackageResource REST controller.
 *
 * @see InvoicePackageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CtsmicroserviceApp.class)
public class InvoicePackageResourceIntTest {

    private static final Long DEFAULT_INVOICE_HEADER_ID = 1L;
    private static final Long UPDATED_INVOICE_HEADER_ID = 2L;

    private static final Integer DEFAULT_ITEM_TOTAL = 1;
    private static final Integer UPDATED_ITEM_TOTAL = 2;

    private static final Float DEFAULT_WEIGHT = 1F;
    private static final Float UPDATED_WEIGHT = 2F;

    private static final Float DEFAULT_HEIGHT = 1F;
    private static final Float UPDATED_HEIGHT = 2F;

    private static final Float DEFAULT_LENGTH = 1F;
    private static final Float UPDATED_LENGTH = 2F;

    private static final Float DEFAULT_WIDTH = 1F;
    private static final Float UPDATED_WIDTH = 2F;

    private static final Boolean DEFAULT_DELIVERED = false;
    private static final Boolean UPDATED_DELIVERED = true;

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_NOTE = "BBBBBBBBBB";

    private static final Long DEFAULT_WAREHOUSE_ID = 1L;
    private static final Long UPDATED_WAREHOUSE_ID = 2L;

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private InvoicePackageRepository invoicePackageRepository;

    @Autowired
    private InvoicePackageMapper invoicePackageMapper;
    
    @Autowired
    private InvoicePackageService invoicePackageService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInvoicePackageMockMvc;

    private InvoicePackage invoicePackage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InvoicePackageResource invoicePackageResource = new InvoicePackageResource(invoicePackageService);
        this.restInvoicePackageMockMvc = MockMvcBuilders.standaloneSetup(invoicePackageResource)
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
    public static InvoicePackage createEntity(EntityManager em) {
        InvoicePackage invoicePackage = new InvoicePackage()
            .invoiceHeaderId(DEFAULT_INVOICE_HEADER_ID)
            .itemTotal(DEFAULT_ITEM_TOTAL)
            .weight(DEFAULT_WEIGHT)
            .height(DEFAULT_HEIGHT)
            .length(DEFAULT_LENGTH)
            .width(DEFAULT_WIDTH)
            .delivered(DEFAULT_DELIVERED)
            .status(DEFAULT_STATUS)
            .note(DEFAULT_NOTE)
            .warehouseId(DEFAULT_WAREHOUSE_ID)
            .createDate(DEFAULT_CREATE_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return invoicePackage;
    }

    @Before
    public void initTest() {
        invoicePackage = createEntity(em);
    }

    @Test
    @Transactional
    public void createInvoicePackage() throws Exception {
        int databaseSizeBeforeCreate = invoicePackageRepository.findAll().size();

        // Create the InvoicePackage
        InvoicePackageDTO invoicePackageDTO = invoicePackageMapper.toDto(invoicePackage);
        restInvoicePackageMockMvc.perform(post("/api/invoice-packages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoicePackageDTO)))
            .andExpect(status().isCreated());

        // Validate the InvoicePackage in the database
        List<InvoicePackage> invoicePackageList = invoicePackageRepository.findAll();
        assertThat(invoicePackageList).hasSize(databaseSizeBeforeCreate + 1);
        InvoicePackage testInvoicePackage = invoicePackageList.get(invoicePackageList.size() - 1);
        assertThat(testInvoicePackage.getInvoiceHeaderId()).isEqualTo(DEFAULT_INVOICE_HEADER_ID);
        assertThat(testInvoicePackage.getItemTotal()).isEqualTo(DEFAULT_ITEM_TOTAL);
        assertThat(testInvoicePackage.getWeight()).isEqualTo(DEFAULT_WEIGHT);
        assertThat(testInvoicePackage.getHeight()).isEqualTo(DEFAULT_HEIGHT);
        assertThat(testInvoicePackage.getLength()).isEqualTo(DEFAULT_LENGTH);
        assertThat(testInvoicePackage.getWidth()).isEqualTo(DEFAULT_WIDTH);
        assertThat(testInvoicePackage.isDelivered()).isEqualTo(DEFAULT_DELIVERED);
        assertThat(testInvoicePackage.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testInvoicePackage.getNote()).isEqualTo(DEFAULT_NOTE);
        assertThat(testInvoicePackage.getWarehouseId()).isEqualTo(DEFAULT_WAREHOUSE_ID);
        assertThat(testInvoicePackage.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testInvoicePackage.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createInvoicePackageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = invoicePackageRepository.findAll().size();

        // Create the InvoicePackage with an existing ID
        invoicePackage.setId(1L);
        InvoicePackageDTO invoicePackageDTO = invoicePackageMapper.toDto(invoicePackage);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInvoicePackageMockMvc.perform(post("/api/invoice-packages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoicePackageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the InvoicePackage in the database
        List<InvoicePackage> invoicePackageList = invoicePackageRepository.findAll();
        assertThat(invoicePackageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInvoicePackages() throws Exception {
        // Initialize the database
        invoicePackageRepository.saveAndFlush(invoicePackage);

        // Get all the invoicePackageList
        restInvoicePackageMockMvc.perform(get("/api/invoice-packages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(invoicePackage.getId().intValue())))
            .andExpect(jsonPath("$.[*].invoiceHeaderId").value(hasItem(DEFAULT_INVOICE_HEADER_ID.intValue())))
            .andExpect(jsonPath("$.[*].itemTotal").value(hasItem(DEFAULT_ITEM_TOTAL)))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].height").value(hasItem(DEFAULT_HEIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].length").value(hasItem(DEFAULT_LENGTH.doubleValue())))
            .andExpect(jsonPath("$.[*].width").value(hasItem(DEFAULT_WIDTH.doubleValue())))
            .andExpect(jsonPath("$.[*].delivered").value(hasItem(DEFAULT_DELIVERED.booleanValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE.toString())))
            .andExpect(jsonPath("$.[*].warehouseId").value(hasItem(DEFAULT_WAREHOUSE_ID.intValue())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getInvoicePackage() throws Exception {
        // Initialize the database
        invoicePackageRepository.saveAndFlush(invoicePackage);

        // Get the invoicePackage
        restInvoicePackageMockMvc.perform(get("/api/invoice-packages/{id}", invoicePackage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(invoicePackage.getId().intValue()))
            .andExpect(jsonPath("$.invoiceHeaderId").value(DEFAULT_INVOICE_HEADER_ID.intValue()))
            .andExpect(jsonPath("$.itemTotal").value(DEFAULT_ITEM_TOTAL))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT.doubleValue()))
            .andExpect(jsonPath("$.height").value(DEFAULT_HEIGHT.doubleValue()))
            .andExpect(jsonPath("$.length").value(DEFAULT_LENGTH.doubleValue()))
            .andExpect(jsonPath("$.width").value(DEFAULT_WIDTH.doubleValue()))
            .andExpect(jsonPath("$.delivered").value(DEFAULT_DELIVERED.booleanValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE.toString()))
            .andExpect(jsonPath("$.warehouseId").value(DEFAULT_WAREHOUSE_ID.intValue()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInvoicePackage() throws Exception {
        // Get the invoicePackage
        restInvoicePackageMockMvc.perform(get("/api/invoice-packages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInvoicePackage() throws Exception {
        // Initialize the database
        invoicePackageRepository.saveAndFlush(invoicePackage);

        int databaseSizeBeforeUpdate = invoicePackageRepository.findAll().size();

        // Update the invoicePackage
        InvoicePackage updatedInvoicePackage = invoicePackageRepository.findById(invoicePackage.getId()).get();
        // Disconnect from session so that the updates on updatedInvoicePackage are not directly saved in db
        em.detach(updatedInvoicePackage);
        updatedInvoicePackage
            .invoiceHeaderId(UPDATED_INVOICE_HEADER_ID)
            .itemTotal(UPDATED_ITEM_TOTAL)
            .weight(UPDATED_WEIGHT)
            .height(UPDATED_HEIGHT)
            .length(UPDATED_LENGTH)
            .width(UPDATED_WIDTH)
            .delivered(UPDATED_DELIVERED)
            .status(UPDATED_STATUS)
            .note(UPDATED_NOTE)
            .warehouseId(UPDATED_WAREHOUSE_ID)
            .createDate(UPDATED_CREATE_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        InvoicePackageDTO invoicePackageDTO = invoicePackageMapper.toDto(updatedInvoicePackage);

        restInvoicePackageMockMvc.perform(put("/api/invoice-packages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoicePackageDTO)))
            .andExpect(status().isOk());

        // Validate the InvoicePackage in the database
        List<InvoicePackage> invoicePackageList = invoicePackageRepository.findAll();
        assertThat(invoicePackageList).hasSize(databaseSizeBeforeUpdate);
        InvoicePackage testInvoicePackage = invoicePackageList.get(invoicePackageList.size() - 1);
        assertThat(testInvoicePackage.getInvoiceHeaderId()).isEqualTo(UPDATED_INVOICE_HEADER_ID);
        assertThat(testInvoicePackage.getItemTotal()).isEqualTo(UPDATED_ITEM_TOTAL);
        assertThat(testInvoicePackage.getWeight()).isEqualTo(UPDATED_WEIGHT);
        assertThat(testInvoicePackage.getHeight()).isEqualTo(UPDATED_HEIGHT);
        assertThat(testInvoicePackage.getLength()).isEqualTo(UPDATED_LENGTH);
        assertThat(testInvoicePackage.getWidth()).isEqualTo(UPDATED_WIDTH);
        assertThat(testInvoicePackage.isDelivered()).isEqualTo(UPDATED_DELIVERED);
        assertThat(testInvoicePackage.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testInvoicePackage.getNote()).isEqualTo(UPDATED_NOTE);
        assertThat(testInvoicePackage.getWarehouseId()).isEqualTo(UPDATED_WAREHOUSE_ID);
        assertThat(testInvoicePackage.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testInvoicePackage.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingInvoicePackage() throws Exception {
        int databaseSizeBeforeUpdate = invoicePackageRepository.findAll().size();

        // Create the InvoicePackage
        InvoicePackageDTO invoicePackageDTO = invoicePackageMapper.toDto(invoicePackage);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInvoicePackageMockMvc.perform(put("/api/invoice-packages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoicePackageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the InvoicePackage in the database
        List<InvoicePackage> invoicePackageList = invoicePackageRepository.findAll();
        assertThat(invoicePackageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInvoicePackage() throws Exception {
        // Initialize the database
        invoicePackageRepository.saveAndFlush(invoicePackage);

        int databaseSizeBeforeDelete = invoicePackageRepository.findAll().size();

        // Get the invoicePackage
        restInvoicePackageMockMvc.perform(delete("/api/invoice-packages/{id}", invoicePackage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<InvoicePackage> invoicePackageList = invoicePackageRepository.findAll();
        assertThat(invoicePackageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InvoicePackage.class);
        InvoicePackage invoicePackage1 = new InvoicePackage();
        invoicePackage1.setId(1L);
        InvoicePackage invoicePackage2 = new InvoicePackage();
        invoicePackage2.setId(invoicePackage1.getId());
        assertThat(invoicePackage1).isEqualTo(invoicePackage2);
        invoicePackage2.setId(2L);
        assertThat(invoicePackage1).isNotEqualTo(invoicePackage2);
        invoicePackage1.setId(null);
        assertThat(invoicePackage1).isNotEqualTo(invoicePackage2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(InvoicePackageDTO.class);
        InvoicePackageDTO invoicePackageDTO1 = new InvoicePackageDTO();
        invoicePackageDTO1.setId(1L);
        InvoicePackageDTO invoicePackageDTO2 = new InvoicePackageDTO();
        assertThat(invoicePackageDTO1).isNotEqualTo(invoicePackageDTO2);
        invoicePackageDTO2.setId(invoicePackageDTO1.getId());
        assertThat(invoicePackageDTO1).isEqualTo(invoicePackageDTO2);
        invoicePackageDTO2.setId(2L);
        assertThat(invoicePackageDTO1).isNotEqualTo(invoicePackageDTO2);
        invoicePackageDTO1.setId(null);
        assertThat(invoicePackageDTO1).isNotEqualTo(invoicePackageDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(invoicePackageMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(invoicePackageMapper.fromId(null)).isNull();
    }
}
