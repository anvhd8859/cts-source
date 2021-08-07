package com.fu.capstone.web.rest;

import com.fu.capstone.CtsmicroserviceApp;

import com.fu.capstone.domain.WarehouseTransferRequest;
import com.fu.capstone.repository.WarehouseTransferRequestRepository;
import com.fu.capstone.service.WarehouseTransferRequestService;
import com.fu.capstone.service.dto.WarehouseTransferRequestDTO;
import com.fu.capstone.service.mapper.WarehouseTransferRequestMapper;
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
 * Test class for the WarehouseTransferRequestResource REST controller.
 *
 * @see WarehouseTransferRequestResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CtsmicroserviceApp.class)
public class WarehouseTransferRequestResourceIntTest {

    private static final Long DEFAULT_FROM_WAREHOUSE_ID = 1L;
    private static final Long UPDATED_FROM_WAREHOUSE_ID = 2L;

    private static final Long DEFAULT_TO_WAREHOUSE_ID = 1L;
    private static final Long UPDATED_TO_WAREHOUSE_ID = 2L;

    private static final Long DEFAULT_FROM_KEEPER_ID = 1L;
    private static final Long UPDATED_FROM_KEEPER_ID = 2L;

    private static final Long DEFAULT_TO_KEEPER_ID = 1L;
    private static final Long UPDATED_TO_KEEPER_ID = 2L;

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final Instant DEFAULT_RECEIVE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_RECEIVE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private WarehouseTransferRequestRepository warehouseTransferRequestRepository;

    @Autowired
    private WarehouseTransferRequestMapper warehouseTransferRequestMapper;
    
    @Autowired
    private WarehouseTransferRequestService warehouseTransferRequestService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWarehouseTransferRequestMockMvc;

    private WarehouseTransferRequest warehouseTransferRequest;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WarehouseTransferRequestResource warehouseTransferRequestResource = new WarehouseTransferRequestResource(warehouseTransferRequestService);
        this.restWarehouseTransferRequestMockMvc = MockMvcBuilders.standaloneSetup(warehouseTransferRequestResource)
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
    public static WarehouseTransferRequest createEntity(EntityManager em) {
        WarehouseTransferRequest warehouseTransferRequest = new WarehouseTransferRequest()
            .fromWarehouseId(DEFAULT_FROM_WAREHOUSE_ID)
            .toWarehouseId(DEFAULT_TO_WAREHOUSE_ID)
            .fromKeeperId(DEFAULT_FROM_KEEPER_ID)
            .toKeeperId(DEFAULT_TO_KEEPER_ID)
            .status(DEFAULT_STATUS)
            .receiveDate(DEFAULT_RECEIVE_DATE)
            .createDate(DEFAULT_CREATE_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return warehouseTransferRequest;
    }

    @Before
    public void initTest() {
        warehouseTransferRequest = createEntity(em);
    }

    @Test
    @Transactional
    public void createWarehouseTransferRequest() throws Exception {
        int databaseSizeBeforeCreate = warehouseTransferRequestRepository.findAll().size();

        // Create the WarehouseTransferRequest
        WarehouseTransferRequestDTO warehouseTransferRequestDTO = warehouseTransferRequestMapper.toDto(warehouseTransferRequest);
        restWarehouseTransferRequestMockMvc.perform(post("/api/warehouse-transfer-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseTransferRequestDTO)))
            .andExpect(status().isCreated());

        // Validate the WarehouseTransferRequest in the database
        List<WarehouseTransferRequest> warehouseTransferRequestList = warehouseTransferRequestRepository.findAll();
        assertThat(warehouseTransferRequestList).hasSize(databaseSizeBeforeCreate + 1);
        WarehouseTransferRequest testWarehouseTransferRequest = warehouseTransferRequestList.get(warehouseTransferRequestList.size() - 1);
        assertThat(testWarehouseTransferRequest.getFromWarehouseId()).isEqualTo(DEFAULT_FROM_WAREHOUSE_ID);
        assertThat(testWarehouseTransferRequest.getToWarehouseId()).isEqualTo(DEFAULT_TO_WAREHOUSE_ID);
        assertThat(testWarehouseTransferRequest.getFromKeeperId()).isEqualTo(DEFAULT_FROM_KEEPER_ID);
        assertThat(testWarehouseTransferRequest.getToKeeperId()).isEqualTo(DEFAULT_TO_KEEPER_ID);
        assertThat(testWarehouseTransferRequest.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testWarehouseTransferRequest.getReceiveDate()).isEqualTo(DEFAULT_RECEIVE_DATE);
        assertThat(testWarehouseTransferRequest.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testWarehouseTransferRequest.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createWarehouseTransferRequestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = warehouseTransferRequestRepository.findAll().size();

        // Create the WarehouseTransferRequest with an existing ID
        warehouseTransferRequest.setId(1L);
        WarehouseTransferRequestDTO warehouseTransferRequestDTO = warehouseTransferRequestMapper.toDto(warehouseTransferRequest);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWarehouseTransferRequestMockMvc.perform(post("/api/warehouse-transfer-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseTransferRequestDTO)))
            .andExpect(status().isBadRequest());

        // Validate the WarehouseTransferRequest in the database
        List<WarehouseTransferRequest> warehouseTransferRequestList = warehouseTransferRequestRepository.findAll();
        assertThat(warehouseTransferRequestList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWarehouseTransferRequests() throws Exception {
        // Initialize the database
        warehouseTransferRequestRepository.saveAndFlush(warehouseTransferRequest);

        // Get all the warehouseTransferRequestList
        restWarehouseTransferRequestMockMvc.perform(get("/api/warehouse-transfer-requests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(warehouseTransferRequest.getId().intValue())))
            .andExpect(jsonPath("$.[*].fromWarehouseId").value(hasItem(DEFAULT_FROM_WAREHOUSE_ID.intValue())))
            .andExpect(jsonPath("$.[*].toWarehouseId").value(hasItem(DEFAULT_TO_WAREHOUSE_ID.intValue())))
            .andExpect(jsonPath("$.[*].fromKeeperId").value(hasItem(DEFAULT_FROM_KEEPER_ID.intValue())))
            .andExpect(jsonPath("$.[*].toKeeperId").value(hasItem(DEFAULT_TO_KEEPER_ID.intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].receiveDate").value(hasItem(DEFAULT_RECEIVE_DATE.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getWarehouseTransferRequest() throws Exception {
        // Initialize the database
        warehouseTransferRequestRepository.saveAndFlush(warehouseTransferRequest);

        // Get the warehouseTransferRequest
        restWarehouseTransferRequestMockMvc.perform(get("/api/warehouse-transfer-requests/{id}", warehouseTransferRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(warehouseTransferRequest.getId().intValue()))
            .andExpect(jsonPath("$.fromWarehouseId").value(DEFAULT_FROM_WAREHOUSE_ID.intValue()))
            .andExpect(jsonPath("$.toWarehouseId").value(DEFAULT_TO_WAREHOUSE_ID.intValue()))
            .andExpect(jsonPath("$.fromKeeperId").value(DEFAULT_FROM_KEEPER_ID.intValue()))
            .andExpect(jsonPath("$.toKeeperId").value(DEFAULT_TO_KEEPER_ID.intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.receiveDate").value(DEFAULT_RECEIVE_DATE.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingWarehouseTransferRequest() throws Exception {
        // Get the warehouseTransferRequest
        restWarehouseTransferRequestMockMvc.perform(get("/api/warehouse-transfer-requests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWarehouseTransferRequest() throws Exception {
        // Initialize the database
        warehouseTransferRequestRepository.saveAndFlush(warehouseTransferRequest);

        int databaseSizeBeforeUpdate = warehouseTransferRequestRepository.findAll().size();

        // Update the warehouseTransferRequest
        WarehouseTransferRequest updatedWarehouseTransferRequest = warehouseTransferRequestRepository.findById(warehouseTransferRequest.getId()).get();
        // Disconnect from session so that the updates on updatedWarehouseTransferRequest are not directly saved in db
        em.detach(updatedWarehouseTransferRequest);
        updatedWarehouseTransferRequest
            .fromWarehouseId(UPDATED_FROM_WAREHOUSE_ID)
            .toWarehouseId(UPDATED_TO_WAREHOUSE_ID)
            .fromKeeperId(UPDATED_FROM_KEEPER_ID)
            .toKeeperId(UPDATED_TO_KEEPER_ID)
            .status(UPDATED_STATUS)
            .receiveDate(UPDATED_RECEIVE_DATE)
            .createDate(UPDATED_CREATE_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        WarehouseTransferRequestDTO warehouseTransferRequestDTO = warehouseTransferRequestMapper.toDto(updatedWarehouseTransferRequest);

        restWarehouseTransferRequestMockMvc.perform(put("/api/warehouse-transfer-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseTransferRequestDTO)))
            .andExpect(status().isOk());

        // Validate the WarehouseTransferRequest in the database
        List<WarehouseTransferRequest> warehouseTransferRequestList = warehouseTransferRequestRepository.findAll();
        assertThat(warehouseTransferRequestList).hasSize(databaseSizeBeforeUpdate);
        WarehouseTransferRequest testWarehouseTransferRequest = warehouseTransferRequestList.get(warehouseTransferRequestList.size() - 1);
        assertThat(testWarehouseTransferRequest.getFromWarehouseId()).isEqualTo(UPDATED_FROM_WAREHOUSE_ID);
        assertThat(testWarehouseTransferRequest.getToWarehouseId()).isEqualTo(UPDATED_TO_WAREHOUSE_ID);
        assertThat(testWarehouseTransferRequest.getFromKeeperId()).isEqualTo(UPDATED_FROM_KEEPER_ID);
        assertThat(testWarehouseTransferRequest.getToKeeperId()).isEqualTo(UPDATED_TO_KEEPER_ID);
        assertThat(testWarehouseTransferRequest.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testWarehouseTransferRequest.getReceiveDate()).isEqualTo(UPDATED_RECEIVE_DATE);
        assertThat(testWarehouseTransferRequest.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testWarehouseTransferRequest.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingWarehouseTransferRequest() throws Exception {
        int databaseSizeBeforeUpdate = warehouseTransferRequestRepository.findAll().size();

        // Create the WarehouseTransferRequest
        WarehouseTransferRequestDTO warehouseTransferRequestDTO = warehouseTransferRequestMapper.toDto(warehouseTransferRequest);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWarehouseTransferRequestMockMvc.perform(put("/api/warehouse-transfer-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseTransferRequestDTO)))
            .andExpect(status().isBadRequest());

        // Validate the WarehouseTransferRequest in the database
        List<WarehouseTransferRequest> warehouseTransferRequestList = warehouseTransferRequestRepository.findAll();
        assertThat(warehouseTransferRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWarehouseTransferRequest() throws Exception {
        // Initialize the database
        warehouseTransferRequestRepository.saveAndFlush(warehouseTransferRequest);

        int databaseSizeBeforeDelete = warehouseTransferRequestRepository.findAll().size();

        // Get the warehouseTransferRequest
        restWarehouseTransferRequestMockMvc.perform(delete("/api/warehouse-transfer-requests/{id}", warehouseTransferRequest.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<WarehouseTransferRequest> warehouseTransferRequestList = warehouseTransferRequestRepository.findAll();
        assertThat(warehouseTransferRequestList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WarehouseTransferRequest.class);
        WarehouseTransferRequest warehouseTransferRequest1 = new WarehouseTransferRequest();
        warehouseTransferRequest1.setId(1L);
        WarehouseTransferRequest warehouseTransferRequest2 = new WarehouseTransferRequest();
        warehouseTransferRequest2.setId(warehouseTransferRequest1.getId());
        assertThat(warehouseTransferRequest1).isEqualTo(warehouseTransferRequest2);
        warehouseTransferRequest2.setId(2L);
        assertThat(warehouseTransferRequest1).isNotEqualTo(warehouseTransferRequest2);
        warehouseTransferRequest1.setId(null);
        assertThat(warehouseTransferRequest1).isNotEqualTo(warehouseTransferRequest2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WarehouseTransferRequestDTO.class);
        WarehouseTransferRequestDTO warehouseTransferRequestDTO1 = new WarehouseTransferRequestDTO();
        warehouseTransferRequestDTO1.setId(1L);
        WarehouseTransferRequestDTO warehouseTransferRequestDTO2 = new WarehouseTransferRequestDTO();
        assertThat(warehouseTransferRequestDTO1).isNotEqualTo(warehouseTransferRequestDTO2);
        warehouseTransferRequestDTO2.setId(warehouseTransferRequestDTO1.getId());
        assertThat(warehouseTransferRequestDTO1).isEqualTo(warehouseTransferRequestDTO2);
        warehouseTransferRequestDTO2.setId(2L);
        assertThat(warehouseTransferRequestDTO1).isNotEqualTo(warehouseTransferRequestDTO2);
        warehouseTransferRequestDTO1.setId(null);
        assertThat(warehouseTransferRequestDTO1).isNotEqualTo(warehouseTransferRequestDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(warehouseTransferRequestMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(warehouseTransferRequestMapper.fromId(null)).isNull();
    }
}
