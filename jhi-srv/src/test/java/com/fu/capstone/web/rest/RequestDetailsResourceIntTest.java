package com.fu.capstone.web.rest;

import com.fu.capstone.CtsmicroserviceApp;

import com.fu.capstone.domain.RequestDetails;
import com.fu.capstone.repository.RequestDetailsRepository;
import com.fu.capstone.service.RequestDetailsService;
import com.fu.capstone.service.dto.RequestDetailsDTO;
import com.fu.capstone.service.mapper.RequestDetailsMapper;
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
 * Test class for the RequestDetailsResource REST controller.
 *
 * @see RequestDetailsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CtsmicroserviceApp.class)
public class RequestDetailsResourceIntTest {

    private static final Long DEFAULT_IE_WAREHOUSE_ID = 1L;
    private static final Long UPDATED_IE_WAREHOUSE_ID = 2L;

    private static final Long DEFAULT_INVOICE_HEADER_ID = 1L;
    private static final Long UPDATED_INVOICE_HEADER_ID = 2L;

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private RequestDetailsRepository requestDetailsRepository;

    @Autowired
    private RequestDetailsMapper requestDetailsMapper;
    
    @Autowired
    private RequestDetailsService requestDetailsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRequestDetailsMockMvc;

    private RequestDetails requestDetails;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RequestDetailsResource requestDetailsResource = new RequestDetailsResource(requestDetailsService);
        this.restRequestDetailsMockMvc = MockMvcBuilders.standaloneSetup(requestDetailsResource)
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
    public static RequestDetails createEntity(EntityManager em) {
        RequestDetails requestDetails = new RequestDetails()
            .ieWarehouseId(DEFAULT_IE_WAREHOUSE_ID)
            .invoiceHeaderId(DEFAULT_INVOICE_HEADER_ID)
            .createDate(DEFAULT_CREATE_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return requestDetails;
    }

    @Before
    public void initTest() {
        requestDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createRequestDetails() throws Exception {
        int databaseSizeBeforeCreate = requestDetailsRepository.findAll().size();

        // Create the RequestDetails
        RequestDetailsDTO requestDetailsDTO = requestDetailsMapper.toDto(requestDetails);
        restRequestDetailsMockMvc.perform(post("/api/request-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(requestDetailsDTO)))
            .andExpect(status().isCreated());

        // Validate the RequestDetails in the database
        List<RequestDetails> requestDetailsList = requestDetailsRepository.findAll();
        assertThat(requestDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        RequestDetails testRequestDetails = requestDetailsList.get(requestDetailsList.size() - 1);
        assertThat(testRequestDetails.getIeWarehouseId()).isEqualTo(DEFAULT_IE_WAREHOUSE_ID);
        assertThat(testRequestDetails.getInvoiceHeaderId()).isEqualTo(DEFAULT_INVOICE_HEADER_ID);
        assertThat(testRequestDetails.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testRequestDetails.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createRequestDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = requestDetailsRepository.findAll().size();

        // Create the RequestDetails with an existing ID
        requestDetails.setId(1L);
        RequestDetailsDTO requestDetailsDTO = requestDetailsMapper.toDto(requestDetails);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRequestDetailsMockMvc.perform(post("/api/request-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(requestDetailsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RequestDetails in the database
        List<RequestDetails> requestDetailsList = requestDetailsRepository.findAll();
        assertThat(requestDetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRequestDetails() throws Exception {
        // Initialize the database
        requestDetailsRepository.saveAndFlush(requestDetails);

        // Get all the requestDetailsList
        restRequestDetailsMockMvc.perform(get("/api/request-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(requestDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].ieWarehouseId").value(hasItem(DEFAULT_IE_WAREHOUSE_ID.intValue())))
            .andExpect(jsonPath("$.[*].invoiceHeaderId").value(hasItem(DEFAULT_INVOICE_HEADER_ID.intValue())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getRequestDetails() throws Exception {
        // Initialize the database
        requestDetailsRepository.saveAndFlush(requestDetails);

        // Get the requestDetails
        restRequestDetailsMockMvc.perform(get("/api/request-details/{id}", requestDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(requestDetails.getId().intValue()))
            .andExpect(jsonPath("$.ieWarehouseId").value(DEFAULT_IE_WAREHOUSE_ID.intValue()))
            .andExpect(jsonPath("$.invoiceHeaderId").value(DEFAULT_INVOICE_HEADER_ID.intValue()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRequestDetails() throws Exception {
        // Get the requestDetails
        restRequestDetailsMockMvc.perform(get("/api/request-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRequestDetails() throws Exception {
        // Initialize the database
        requestDetailsRepository.saveAndFlush(requestDetails);

        int databaseSizeBeforeUpdate = requestDetailsRepository.findAll().size();

        // Update the requestDetails
        RequestDetails updatedRequestDetails = requestDetailsRepository.findById(requestDetails.getId()).get();
        // Disconnect from session so that the updates on updatedRequestDetails are not directly saved in db
        em.detach(updatedRequestDetails);
        updatedRequestDetails
            .ieWarehouseId(UPDATED_IE_WAREHOUSE_ID)
            .invoiceHeaderId(UPDATED_INVOICE_HEADER_ID)
            .createDate(UPDATED_CREATE_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        RequestDetailsDTO requestDetailsDTO = requestDetailsMapper.toDto(updatedRequestDetails);

        restRequestDetailsMockMvc.perform(put("/api/request-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(requestDetailsDTO)))
            .andExpect(status().isOk());

        // Validate the RequestDetails in the database
        List<RequestDetails> requestDetailsList = requestDetailsRepository.findAll();
        assertThat(requestDetailsList).hasSize(databaseSizeBeforeUpdate);
        RequestDetails testRequestDetails = requestDetailsList.get(requestDetailsList.size() - 1);
        assertThat(testRequestDetails.getIeWarehouseId()).isEqualTo(UPDATED_IE_WAREHOUSE_ID);
        assertThat(testRequestDetails.getInvoiceHeaderId()).isEqualTo(UPDATED_INVOICE_HEADER_ID);
        assertThat(testRequestDetails.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testRequestDetails.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingRequestDetails() throws Exception {
        int databaseSizeBeforeUpdate = requestDetailsRepository.findAll().size();

        // Create the RequestDetails
        RequestDetailsDTO requestDetailsDTO = requestDetailsMapper.toDto(requestDetails);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRequestDetailsMockMvc.perform(put("/api/request-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(requestDetailsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RequestDetails in the database
        List<RequestDetails> requestDetailsList = requestDetailsRepository.findAll();
        assertThat(requestDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRequestDetails() throws Exception {
        // Initialize the database
        requestDetailsRepository.saveAndFlush(requestDetails);

        int databaseSizeBeforeDelete = requestDetailsRepository.findAll().size();

        // Get the requestDetails
        restRequestDetailsMockMvc.perform(delete("/api/request-details/{id}", requestDetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RequestDetails> requestDetailsList = requestDetailsRepository.findAll();
        assertThat(requestDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RequestDetails.class);
        RequestDetails requestDetails1 = new RequestDetails();
        requestDetails1.setId(1L);
        RequestDetails requestDetails2 = new RequestDetails();
        requestDetails2.setId(requestDetails1.getId());
        assertThat(requestDetails1).isEqualTo(requestDetails2);
        requestDetails2.setId(2L);
        assertThat(requestDetails1).isNotEqualTo(requestDetails2);
        requestDetails1.setId(null);
        assertThat(requestDetails1).isNotEqualTo(requestDetails2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RequestDetailsDTO.class);
        RequestDetailsDTO requestDetailsDTO1 = new RequestDetailsDTO();
        requestDetailsDTO1.setId(1L);
        RequestDetailsDTO requestDetailsDTO2 = new RequestDetailsDTO();
        assertThat(requestDetailsDTO1).isNotEqualTo(requestDetailsDTO2);
        requestDetailsDTO2.setId(requestDetailsDTO1.getId());
        assertThat(requestDetailsDTO1).isEqualTo(requestDetailsDTO2);
        requestDetailsDTO2.setId(2L);
        assertThat(requestDetailsDTO1).isNotEqualTo(requestDetailsDTO2);
        requestDetailsDTO1.setId(null);
        assertThat(requestDetailsDTO1).isNotEqualTo(requestDetailsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(requestDetailsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(requestDetailsMapper.fromId(null)).isNull();
    }
}
