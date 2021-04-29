package com.fu.capstone.web.rest;

import com.fu.capstone.CtsmicroserviceApp;

import com.fu.capstone.domain.ImportExportWarehouse;
import com.fu.capstone.repository.ImportExportWarehouseRepository;
import com.fu.capstone.service.ImportExportWarehouseService;
import com.fu.capstone.service.dto.ImportExportWarehouseDTO;
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
public class ImportExportWarehouseResourceIntTest {

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

    private ImportExportWarehouse importExportWarehouse;

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
    public static ImportExportWarehouse createEntity(EntityManager em) {
        ImportExportWarehouse importExportWarehouse = new ImportExportWarehouse()
            .officeId(DEFAULT_OFFICE_ID)
            .keeperId(DEFAULT_KEEPER_ID)
            .employeeId(DEFAULT_EMPLOYEE_ID)
            .type(DEFAULT_TYPE)
            .note(DEFAULT_NOTE)
            .keeperConfirm(DEFAULT_KEEPER_CONFIRM)
            .shipDate(DEFAULT_SHIP_DATE)
            .createDate(DEFAULT_CREATE_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return importExportWarehouse;
    }

    @Before
    public void initTest() {
        importExportWarehouse = createEntity(em);
    }

    @Test
    @Transactional
    public void createImportExportWarehouse() throws Exception {
        int databaseSizeBeforeCreate = importExportWarehouseRepository.findAll().size();

        // Create the ImportExportWarehouse
        ImportExportWarehouseDTO importExportWarehouseDTO = importExportWarehouseMapper.toDto(importExportWarehouse);
        restImportExportWarehouseMockMvc.perform(post("/api/import-export-warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(importExportWarehouseDTO)))
            .andExpect(status().isCreated());

        // Validate the ImportExportWarehouse in the database
        List<ImportExportWarehouse> importExportWarehouseList = importExportWarehouseRepository.findAll();
        assertThat(importExportWarehouseList).hasSize(databaseSizeBeforeCreate + 1);
        ImportExportWarehouse testImportExportWarehouse = importExportWarehouseList.get(importExportWarehouseList.size() - 1);
        assertThat(testImportExportWarehouse.getOfficeId()).isEqualTo(DEFAULT_OFFICE_ID);
        assertThat(testImportExportWarehouse.getKeeperId()).isEqualTo(DEFAULT_KEEPER_ID);
        assertThat(testImportExportWarehouse.getEmployeeId()).isEqualTo(DEFAULT_EMPLOYEE_ID);
        assertThat(testImportExportWarehouse.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testImportExportWarehouse.getNote()).isEqualTo(DEFAULT_NOTE);
        assertThat(testImportExportWarehouse.isKeeperConfirm()).isEqualTo(DEFAULT_KEEPER_CONFIRM);
        assertThat(testImportExportWarehouse.getShipDate()).isEqualTo(DEFAULT_SHIP_DATE);
        assertThat(testImportExportWarehouse.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testImportExportWarehouse.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createImportExportWarehouseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = importExportWarehouseRepository.findAll().size();

        // Create the ImportExportWarehouse with an existing ID
        importExportWarehouse.setId(1L);
        ImportExportWarehouseDTO importExportWarehouseDTO = importExportWarehouseMapper.toDto(importExportWarehouse);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImportExportWarehouseMockMvc.perform(post("/api/import-export-warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(importExportWarehouseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ImportExportWarehouse in the database
        List<ImportExportWarehouse> importExportWarehouseList = importExportWarehouseRepository.findAll();
        assertThat(importExportWarehouseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllImportExportWarehouses() throws Exception {
        // Initialize the database
        importExportWarehouseRepository.saveAndFlush(importExportWarehouse);

        // Get all the importExportWarehouseList
        restImportExportWarehouseMockMvc.perform(get("/api/import-export-warehouses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(importExportWarehouse.getId().intValue())))
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
        importExportWarehouseRepository.saveAndFlush(importExportWarehouse);

        // Get the importExportWarehouse
        restImportExportWarehouseMockMvc.perform(get("/api/import-export-warehouses/{id}", importExportWarehouse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(importExportWarehouse.getId().intValue()))
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
        importExportWarehouseRepository.saveAndFlush(importExportWarehouse);

        int databaseSizeBeforeUpdate = importExportWarehouseRepository.findAll().size();

        // Update the importExportWarehouse
        ImportExportWarehouse updatedImportExportWarehouse = importExportWarehouseRepository.findById(importExportWarehouse.getId()).get();
        // Disconnect from session so that the updates on updatedImportExportWarehouse are not directly saved in db
        em.detach(updatedImportExportWarehouse);
        updatedImportExportWarehouse
            .officeId(UPDATED_OFFICE_ID)
            .keeperId(UPDATED_KEEPER_ID)
            .employeeId(UPDATED_EMPLOYEE_ID)
            .type(UPDATED_TYPE)
            .note(UPDATED_NOTE)
            .keeperConfirm(UPDATED_KEEPER_CONFIRM)
            .shipDate(UPDATED_SHIP_DATE)
            .createDate(UPDATED_CREATE_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        ImportExportWarehouseDTO importExportWarehouseDTO = importExportWarehouseMapper.toDto(updatedImportExportWarehouse);

        restImportExportWarehouseMockMvc.perform(put("/api/import-export-warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(importExportWarehouseDTO)))
            .andExpect(status().isOk());

        // Validate the ImportExportWarehouse in the database
        List<ImportExportWarehouse> importExportWarehouseList = importExportWarehouseRepository.findAll();
        assertThat(importExportWarehouseList).hasSize(databaseSizeBeforeUpdate);
        ImportExportWarehouse testImportExportWarehouse = importExportWarehouseList.get(importExportWarehouseList.size() - 1);
        assertThat(testImportExportWarehouse.getOfficeId()).isEqualTo(UPDATED_OFFICE_ID);
        assertThat(testImportExportWarehouse.getKeeperId()).isEqualTo(UPDATED_KEEPER_ID);
        assertThat(testImportExportWarehouse.getEmployeeId()).isEqualTo(UPDATED_EMPLOYEE_ID);
        assertThat(testImportExportWarehouse.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testImportExportWarehouse.getNote()).isEqualTo(UPDATED_NOTE);
        assertThat(testImportExportWarehouse.isKeeperConfirm()).isEqualTo(UPDATED_KEEPER_CONFIRM);
        assertThat(testImportExportWarehouse.getShipDate()).isEqualTo(UPDATED_SHIP_DATE);
        assertThat(testImportExportWarehouse.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testImportExportWarehouse.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingImportExportWarehouse() throws Exception {
        int databaseSizeBeforeUpdate = importExportWarehouseRepository.findAll().size();

        // Create the ImportExportWarehouse
        ImportExportWarehouseDTO importExportWarehouseDTO = importExportWarehouseMapper.toDto(importExportWarehouse);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImportExportWarehouseMockMvc.perform(put("/api/import-export-warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(importExportWarehouseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ImportExportWarehouse in the database
        List<ImportExportWarehouse> importExportWarehouseList = importExportWarehouseRepository.findAll();
        assertThat(importExportWarehouseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteImportExportWarehouse() throws Exception {
        // Initialize the database
        importExportWarehouseRepository.saveAndFlush(importExportWarehouse);

        int databaseSizeBeforeDelete = importExportWarehouseRepository.findAll().size();

        // Get the importExportWarehouse
        restImportExportWarehouseMockMvc.perform(delete("/api/import-export-warehouses/{id}", importExportWarehouse.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ImportExportWarehouse> importExportWarehouseList = importExportWarehouseRepository.findAll();
        assertThat(importExportWarehouseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ImportExportWarehouse.class);
        ImportExportWarehouse importExportWarehouse1 = new ImportExportWarehouse();
        importExportWarehouse1.setId(1L);
        ImportExportWarehouse importExportWarehouse2 = new ImportExportWarehouse();
        importExportWarehouse2.setId(importExportWarehouse1.getId());
        assertThat(importExportWarehouse1).isEqualTo(importExportWarehouse2);
        importExportWarehouse2.setId(2L);
        assertThat(importExportWarehouse1).isNotEqualTo(importExportWarehouse2);
        importExportWarehouse1.setId(null);
        assertThat(importExportWarehouse1).isNotEqualTo(importExportWarehouse2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ImportExportWarehouseDTO.class);
        ImportExportWarehouseDTO importExportWarehouseDTO1 = new ImportExportWarehouseDTO();
        importExportWarehouseDTO1.setId(1L);
        ImportExportWarehouseDTO importExportWarehouseDTO2 = new ImportExportWarehouseDTO();
        assertThat(importExportWarehouseDTO1).isNotEqualTo(importExportWarehouseDTO2);
        importExportWarehouseDTO2.setId(importExportWarehouseDTO1.getId());
        assertThat(importExportWarehouseDTO1).isEqualTo(importExportWarehouseDTO2);
        importExportWarehouseDTO2.setId(2L);
        assertThat(importExportWarehouseDTO1).isNotEqualTo(importExportWarehouseDTO2);
        importExportWarehouseDTO1.setId(null);
        assertThat(importExportWarehouseDTO1).isNotEqualTo(importExportWarehouseDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(importExportWarehouseMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(importExportWarehouseMapper.fromId(null)).isNull();
    }
}
