package com.fu.capstone.web.rest;

import com.fu.capstone.CtsmicroserviceApp;

import com.fu.capstone.domain.TransferDetails;
import com.fu.capstone.repository.TransferDetailsRepository;
import com.fu.capstone.service.TransferDetailsService;
import com.fu.capstone.service.dto.TransferDetailsDTO;
import com.fu.capstone.service.mapper.TransferDetailsMapper;
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
 * Test class for the TransferDetailsResource REST controller.
 *
 * @see TransferDetailsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CtsmicroserviceApp.class)
public class TransferDetailsResourceIntTest {

    private static final Long DEFAULT_TRANSFER_ID = 1L;
    private static final Long UPDATED_TRANSFER_ID = 2L;

    private static final Long DEFAULT_INVOICE_PACKAGE_IDACKAGE_ID = 1L;
    private static final Long UPDATED_INVOICE_PACKAGE_IDACKAGE_ID = 2L;

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TransferDetailsRepository transferDetailsRepository;

    @Autowired
    private TransferDetailsMapper transferDetailsMapper;
    
    @Autowired
    private TransferDetailsService transferDetailsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTransferDetailsMockMvc;

    private TransferDetails transferDetails;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransferDetailsResource transferDetailsResource = new TransferDetailsResource(transferDetailsService);
        this.restTransferDetailsMockMvc = MockMvcBuilders.standaloneSetup(transferDetailsResource)
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
    public static TransferDetails createEntity(EntityManager em) {
        TransferDetails transferDetails = new TransferDetails()
            .transferId(DEFAULT_TRANSFER_ID)
            .invoicePackageId(DEFAULT_INVOICE_PACKAGE_IDACKAGE_ID)
            .createDate(DEFAULT_CREATE_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return transferDetails;
    }

    @Before
    public void initTest() {
        transferDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransferDetails() throws Exception {
        int databaseSizeBeforeCreate = transferDetailsRepository.findAll().size();

        // Create the TransferDetails
        TransferDetailsDTO transferDetailsDTO = transferDetailsMapper.toDto(transferDetails);
        restTransferDetailsMockMvc.perform(post("/api/transfer-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transferDetailsDTO)))
            .andExpect(status().isCreated());

        // Validate the TransferDetails in the database
        List<TransferDetails> transferDetailsList = transferDetailsRepository.findAll();
        assertThat(transferDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        TransferDetails testTransferDetails = transferDetailsList.get(transferDetailsList.size() - 1);
        assertThat(testTransferDetails.getTransferId()).isEqualTo(DEFAULT_TRANSFER_ID);
        assertThat(testTransferDetails.getInvoicePackageId()).isEqualTo(DEFAULT_INVOICE_PACKAGE_IDACKAGE_ID);
        assertThat(testTransferDetails.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testTransferDetails.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createTransferDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transferDetailsRepository.findAll().size();

        // Create the TransferDetails with an existing ID
        transferDetails.setId(1L);
        TransferDetailsDTO transferDetailsDTO = transferDetailsMapper.toDto(transferDetails);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransferDetailsMockMvc.perform(post("/api/transfer-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transferDetailsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TransferDetails in the database
        List<TransferDetails> transferDetailsList = transferDetailsRepository.findAll();
        assertThat(transferDetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTransferDetails() throws Exception {
        // Initialize the database
        transferDetailsRepository.saveAndFlush(transferDetails);

        // Get all the transferDetailsList
        restTransferDetailsMockMvc.perform(get("/api/transfer-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transferDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].transferId").value(hasItem(DEFAULT_TRANSFER_ID.intValue())))
            .andExpect(jsonPath("$.[*].invoicePackageIdackageId").value(hasItem(DEFAULT_INVOICE_PACKAGE_IDACKAGE_ID.intValue())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getTransferDetails() throws Exception {
        // Initialize the database
        transferDetailsRepository.saveAndFlush(transferDetails);

        // Get the transferDetails
        restTransferDetailsMockMvc.perform(get("/api/transfer-details/{id}", transferDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transferDetails.getId().intValue()))
            .andExpect(jsonPath("$.transferId").value(DEFAULT_TRANSFER_ID.intValue()))
            .andExpect(jsonPath("$.invoicePackageIdackageId").value(DEFAULT_INVOICE_PACKAGE_IDACKAGE_ID.intValue()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTransferDetails() throws Exception {
        // Get the transferDetails
        restTransferDetailsMockMvc.perform(get("/api/transfer-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransferDetails() throws Exception {
        // Initialize the database
        transferDetailsRepository.saveAndFlush(transferDetails);

        int databaseSizeBeforeUpdate = transferDetailsRepository.findAll().size();

        // Update the transferDetails
        TransferDetails updatedTransferDetails = transferDetailsRepository.findById(transferDetails.getId()).get();
        // Disconnect from session so that the updates on updatedTransferDetails are not directly saved in db
        em.detach(updatedTransferDetails);
        updatedTransferDetails
            .transferId(UPDATED_TRANSFER_ID)
            .invoicePackageId(UPDATED_INVOICE_PACKAGE_IDACKAGE_ID)
            .createDate(UPDATED_CREATE_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        TransferDetailsDTO transferDetailsDTO = transferDetailsMapper.toDto(updatedTransferDetails);

        restTransferDetailsMockMvc.perform(put("/api/transfer-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transferDetailsDTO)))
            .andExpect(status().isOk());

        // Validate the TransferDetails in the database
        List<TransferDetails> transferDetailsList = transferDetailsRepository.findAll();
        assertThat(transferDetailsList).hasSize(databaseSizeBeforeUpdate);
        TransferDetails testTransferDetails = transferDetailsList.get(transferDetailsList.size() - 1);
        assertThat(testTransferDetails.getTransferId()).isEqualTo(UPDATED_TRANSFER_ID);
        assertThat(testTransferDetails.getInvoicePackageId()).isEqualTo(UPDATED_INVOICE_PACKAGE_IDACKAGE_ID);
        assertThat(testTransferDetails.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testTransferDetails.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTransferDetails() throws Exception {
        int databaseSizeBeforeUpdate = transferDetailsRepository.findAll().size();

        // Create the TransferDetails
        TransferDetailsDTO transferDetailsDTO = transferDetailsMapper.toDto(transferDetails);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransferDetailsMockMvc.perform(put("/api/transfer-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transferDetailsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TransferDetails in the database
        List<TransferDetails> transferDetailsList = transferDetailsRepository.findAll();
        assertThat(transferDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransferDetails() throws Exception {
        // Initialize the database
        transferDetailsRepository.saveAndFlush(transferDetails);

        int databaseSizeBeforeDelete = transferDetailsRepository.findAll().size();

        // Get the transferDetails
        restTransferDetailsMockMvc.perform(delete("/api/transfer-details/{id}", transferDetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TransferDetails> transferDetailsList = transferDetailsRepository.findAll();
        assertThat(transferDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransferDetails.class);
        TransferDetails transferDetails1 = new TransferDetails();
        transferDetails1.setId(1L);
        TransferDetails transferDetails2 = new TransferDetails();
        transferDetails2.setId(transferDetails1.getId());
        assertThat(transferDetails1).isEqualTo(transferDetails2);
        transferDetails2.setId(2L);
        assertThat(transferDetails1).isNotEqualTo(transferDetails2);
        transferDetails1.setId(null);
        assertThat(transferDetails1).isNotEqualTo(transferDetails2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransferDetailsDTO.class);
        TransferDetailsDTO transferDetailsDTO1 = new TransferDetailsDTO();
        transferDetailsDTO1.setId(1L);
        TransferDetailsDTO transferDetailsDTO2 = new TransferDetailsDTO();
        assertThat(transferDetailsDTO1).isNotEqualTo(transferDetailsDTO2);
        transferDetailsDTO2.setId(transferDetailsDTO1.getId());
        assertThat(transferDetailsDTO1).isEqualTo(transferDetailsDTO2);
        transferDetailsDTO2.setId(2L);
        assertThat(transferDetailsDTO1).isNotEqualTo(transferDetailsDTO2);
        transferDetailsDTO1.setId(null);
        assertThat(transferDetailsDTO1).isNotEqualTo(transferDetailsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(transferDetailsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(transferDetailsMapper.fromId(null)).isNull();
    }
}
