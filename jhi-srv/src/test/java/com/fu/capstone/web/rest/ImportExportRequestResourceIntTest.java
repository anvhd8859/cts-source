package com.fu.capstone.web.rest;

import com.fu.capstone.CtsmicroserviceApp;

import com.fu.capstone.domain.ImportExportRequest;
import com.fu.capstone.repository.ImportExportWarehouseRepository;
import com.fu.capstone.service.ImportExportWarehouseService;
import com.fu.capstone.service.dto.ImportExportRequestDTO;
import com.fu.capstone.service.mapper.ImportExportWarehouseMapper;
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
 * Test class for the ImportExportWarehouseResource REST controller.
 *
 * @see ImportExportWarehouseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CtsmicroserviceApp.class)
public class ImportExportRequestResourceIntTest {

    private static final Long DEFAULT_OFFICE_ID = 1L;
    private static final Long UPDATED_OFFICE_ID = 2L;

    private static final Long DEFAULT_KEEPER_ID = 1L;
    private static final Long UPDATED_KEEPER_ID = 2L;

    private static final Long DEFAULT_EMPLOYEE_ID = 1L;
    private static final Long UPDATED_EMPLOYEE_ID = 2L;

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_NOTE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_KEEPER_CONFIRM = false;
    private static final Boolean UPDATED_KEEPER_CONFIRM = true;

    private static final Instant DEFAULT_SHIP_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SHIP_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ImportExportWarehouseRepository importExportWarehouseRepository;

    @Autowired
    private ImportExportWarehouseMapper importExportWarehouseMapper;
    
    @Autowired
    private ImportExportWarehouseService importExportWarehouseService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restImportExportWarehouseMockMvc;

    private ImportExportRequest importExportRequest;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ImportExportWarehouseResource importExportWarehouseResource = new ImportExportWarehouseResource(importExportWarehouseService);
        this.restImportExportWarehouseMockMvc = MockMvcBuilders.standaloneSetup(importExportWarehouseResource)
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
    public static ImportExportRequest createEntity(EntityManager em) {
        ImportExportRequest importExportRequest = new ImportExportRequest()
            .officeId(DEFAULT_OFFICE_ID)
            .keeperId(DEFAULT_KEEPER_ID)
            .employeeId(DEFAULT_EMPLOYEE_ID)
            .type(DEFAULT_TYPE)
            .note(DEFAULT_NOTE)
            .keeperConfirm(DEFAULT_KEEPER_CONFIRM)
            .shipDate(DEFAULT_SHIP_DATE)
            .createDate(DEFAULT_CREATE_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return importExportRequest;
    }

    @Before
    public void initTest() {
        importExportRequest = createEntity(em);
    }

    @Test
    @Transactional
    public void createImportExportWarehouse() throws Exception {
        int databaseSizeBeforeCreate = importExportWarehouseRepository.findAll().size();

        // Create the ImportExportWarehouse
        ImportExportRequestDTO importExportRequestDTO = importExportWarehouseMapper.toDto(importExportRequest);
        restImportExportWarehouseMockMvc.perform(post("/api/import-export-warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(importExportRequestDTO)))
            .andExpect(status().isCreated());

        // Validate the ImportExportWarehouse in the database
        List<ImportExportRequest> importExportRequestList = importExportWarehouseRepository.findAll();
        assertThat(importExportRequestList).hasSize(databaseSizeBeforeCreate + 1);
        ImportExportRequest testImportExportRequest = importExportRequestList.get(importExportRequestList.size() - 1);
        assertThat(testImportExportRequest.getWarehouseId()).isEqualTo(DEFAULT_OFFICE_ID);
        assertThat(testImportExportRequest.getKeeperId()).isEqualTo(DEFAULT_KEEPER_ID);
        assertThat(testImportExportRequest.getEmployeeId()).isEqualTo(DEFAULT_EMPLOYEE_ID);
        assertThat(testImportExportRequest.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testImportExportRequest.getStatus()).isEqualTo(DEFAULT_NOTE);
        assertThat(testImportExportRequest.isKeeperConfirm()).isEqualTo(DEFAULT_KEEPER_CONFIRM);
        assertThat(testImportExportRequest.getShipDate()).isEqualTo(DEFAULT_SHIP_DATE);
        assertThat(testImportExportRequest.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testImportExportRequest.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createImportExportWarehouseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = importExportWarehouseRepository.findAll().size();

        // Create the ImportExportWarehouse with an existing ID
        importExportRequest.setId(1L);
        ImportExportRequestDTO importExportRequestDTO = importExportWarehouseMapper.toDto(importExportRequest);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImportExportWarehouseMockMvc.perform(post("/api/import-export-warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(importExportRequestDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ImportExportWarehouse in the database
        List<ImportExportRequest> importExportRequestList = importExportWarehouseRepository.findAll();
        assertThat(importExportRequestList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllImportExportWarehouses() throws Exception {
        // Initialize the database
        importExportWarehouseRepository.saveAndFlush(importExportRequest);

        // Get all the importExportWarehouseList
        restImportExportWarehouseMockMvc.perform(get("/api/import-export-warehouses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(importExportRequest.getId().intValue())))
            .andExpect(jsonPath("$.[*].officeId").value(hasItem(DEFAULT_OFFICE_ID.intValue())))
            .andExpect(jsonPath("$.[*].keeperId").value(hasItem(DEFAULT_KEEPER_ID.intValue())))
            .andExpect(jsonPath("$.[*].employeeId").value(hasItem(DEFAULT_EMPLOYEE_ID.intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE.toString())))
            .andExpect(jsonPath("$.[*].keeperConfirm").value(hasItem(DEFAULT_KEEPER_CONFIRM.booleanValue())))
            .andExpect(jsonPath("$.[*].shipDate").value(hasItem(DEFAULT_SHIP_DATE.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getImportExportWarehouse() throws Exception {
        // Initialize the database
        importExportWarehouseRepository.saveAndFlush(importExportRequest);

        // Get the importExportWarehouse
        restImportExportWarehouseMockMvc.perform(get("/api/import-export-warehouses/{id}", importExportRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(importExportRequest.getId().intValue()))
            .andExpect(jsonPath("$.officeId").value(DEFAULT_OFFICE_ID.intValue()))
            .andExpect(jsonPath("$.keeperId").value(DEFAULT_KEEPER_ID.intValue()))
            .andExpect(jsonPath("$.employeeId").value(DEFAULT_EMPLOYEE_ID.intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE.toString()))
            .andExpect(jsonPath("$.keeperConfirm").value(DEFAULT_KEEPER_CONFIRM.booleanValue()))
            .andExpect(jsonPath("$.shipDate").value(DEFAULT_SHIP_DATE.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingImportExportWarehouse() throws Exception {
        // Get the importExportWarehouse
        restImportExportWarehouseMockMvc.perform(get("/api/import-export-warehouses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateImportExportWarehouse() throws Exception {
        // Initialize the database
        importExportWarehouseRepository.saveAndFlush(importExportRequest);

        int databaseSizeBeforeUpdate = importExportWarehouseRepository.findAll().size();

        // Update the importExportWarehouse
        ImportExportRequest updatedImportExportRequest = importExportWarehouseRepository.findById(importExportRequest.getId()).get();
        // Disconnect from session so that the updates on updatedImportExportWarehouse are not directly saved in db
        em.detach(updatedImportExportRequest);
        updatedImportExportRequest
            .officeId(UPDATED_OFFICE_ID)
            .keeperId(UPDATED_KEEPER_ID)
            .employeeId(UPDATED_EMPLOYEE_ID)
            .type(UPDATED_TYPE)
            .note(UPDATED_NOTE)
            .keeperConfirm(UPDATED_KEEPER_CONFIRM)
            .shipDate(UPDATED_SHIP_DATE)
            .createDate(UPDATED_CREATE_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        ImportExportRequestDTO importExportRequestDTO = importExportWarehouseMapper.toDto(updatedImportExportRequest);

        restImportExportWarehouseMockMvc.perform(put("/api/import-export-warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(importExportRequestDTO)))
            .andExpect(status().isOk());

        // Validate the ImportExportWarehouse in the database
        List<ImportExportRequest> importExportRequestList = importExportWarehouseRepository.findAll();
        assertThat(importExportRequestList).hasSize(databaseSizeBeforeUpdate);
        ImportExportRequest testImportExportRequest = importExportRequestList.get(importExportRequestList.size() - 1);
        assertThat(testImportExportRequest.getWarehouseId()).isEqualTo(UPDATED_OFFICE_ID);
        assertThat(testImportExportRequest.getKeeperId()).isEqualTo(UPDATED_KEEPER_ID);
        assertThat(testImportExportRequest.getEmployeeId()).isEqualTo(UPDATED_EMPLOYEE_ID);
        assertThat(testImportExportRequest.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testImportExportRequest.getStatus()).isEqualTo(UPDATED_NOTE);
        assertThat(testImportExportRequest.isKeeperConfirm()).isEqualTo(UPDATED_KEEPER_CONFIRM);
        assertThat(testImportExportRequest.getShipDate()).isEqualTo(UPDATED_SHIP_DATE);
        assertThat(testImportExportRequest.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testImportExportRequest.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingImportExportWarehouse() throws Exception {
        int databaseSizeBeforeUpdate = importExportWarehouseRepository.findAll().size();

        // Create the ImportExportWarehouse
        ImportExportRequestDTO importExportRequestDTO = importExportWarehouseMapper.toDto(importExportRequest);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImportExportWarehouseMockMvc.perform(put("/api/import-export-warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(importExportRequestDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ImportExportWarehouse in the database
        List<ImportExportRequest> importExportRequestList = importExportWarehouseRepository.findAll();
        assertThat(importExportRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteImportExportWarehouse() throws Exception {
        // Initialize the database
        importExportWarehouseRepository.saveAndFlush(importExportRequest);

        int databaseSizeBeforeDelete = importExportWarehouseRepository.findAll().size();

        // Get the importExportWarehouse
        restImportExportWarehouseMockMvc.perform(delete("/api/import-export-warehouses/{id}", importExportRequest.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ImportExportRequest> importExportRequestList = importExportWarehouseRepository.findAll();
        assertThat(importExportRequestList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ImportExportRequest.class);
        ImportExportRequest importExportRequest1 = new ImportExportRequest();
        importExportRequest1.setId(1L);
        ImportExportRequest importExportRequest2 = new ImportExportRequest();
        importExportRequest2.setId(importExportRequest1.getId());
        assertThat(importExportRequest1).isEqualTo(importExportRequest2);
        importExportRequest2.setId(2L);
        assertThat(importExportRequest1).isNotEqualTo(importExportRequest2);
        importExportRequest1.setId(null);
        assertThat(importExportRequest1).isNotEqualTo(importExportRequest2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ImportExportRequestDTO.class);
        ImportExportRequestDTO importExportRequestDTO1 = new ImportExportRequestDTO();
        importExportRequestDTO1.setId(1L);
        ImportExportRequestDTO importExportRequestDTO2 = new ImportExportRequestDTO();
        assertThat(importExportRequestDTO1).isNotEqualTo(importExportRequestDTO2);
        importExportRequestDTO2.setId(importExportRequestDTO1.getId());
        assertThat(importExportRequestDTO1).isEqualTo(importExportRequestDTO2);
        importExportRequestDTO2.setId(2L);
        assertThat(importExportRequestDTO1).isNotEqualTo(importExportRequestDTO2);
        importExportRequestDTO1.setId(null);
        assertThat(importExportRequestDTO1).isNotEqualTo(importExportRequestDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(importExportWarehouseMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(importExportWarehouseMapper.fromId(null)).isNull();
    }
}
