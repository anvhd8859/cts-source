package com.fu.capstone.web.rest;

import com.fu.capstone.CtsmicroserviceApp;

import com.fu.capstone.domain.WorkingArea;
import com.fu.capstone.repository.WorkingAreaRepository;
import com.fu.capstone.service.WorkingAreaService;
import com.fu.capstone.service.dto.WorkingAreaDTO;
import com.fu.capstone.service.mapper.WorkingAreaMapper;
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
 * Test class for the WorkingAreaResource REST controller.
 *
 * @see WorkingAreaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CtsmicroserviceApp.class)
public class WorkingAreaResourceIntTest {

    private static final Long DEFAULT_STREET_ID = 1L;
    private static final Long UPDATED_STREET_ID = 2L;

    private static final Long DEFAULT_EMPLOYEE_ID = 1L;
    private static final Long UPDATED_EMPLOYEE_ID = 2L;

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private WorkingAreaRepository workingAreaRepository;

    @Autowired
    private WorkingAreaMapper workingAreaMapper;
    
    @Autowired
    private WorkingAreaService workingAreaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWorkingAreaMockMvc;

    private WorkingArea workingArea;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WorkingAreaResource workingAreaResource = new WorkingAreaResource(workingAreaService);
        this.restWorkingAreaMockMvc = MockMvcBuilders.standaloneSetup(workingAreaResource)
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
    public static WorkingArea createEntity(EntityManager em) {
        WorkingArea workingArea = new WorkingArea()
            .streetId(DEFAULT_STREET_ID)
            .employeeId(DEFAULT_EMPLOYEE_ID)
            .createDate(DEFAULT_CREATE_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return workingArea;
    }

    @Before
    public void initTest() {
        workingArea = createEntity(em);
    }

    @Test
    @Transactional
    public void createWorkingArea() throws Exception {
        int databaseSizeBeforeCreate = workingAreaRepository.findAll().size();

        // Create the WorkingArea
        WorkingAreaDTO workingAreaDTO = workingAreaMapper.toDto(workingArea);
        restWorkingAreaMockMvc.perform(post("/api/working-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workingAreaDTO)))
            .andExpect(status().isCreated());

        // Validate the WorkingArea in the database
        List<WorkingArea> workingAreaList = workingAreaRepository.findAll();
        assertThat(workingAreaList).hasSize(databaseSizeBeforeCreate + 1);
        WorkingArea testWorkingArea = workingAreaList.get(workingAreaList.size() - 1);
        assertThat(testWorkingArea.getStreetId()).isEqualTo(DEFAULT_STREET_ID);
        assertThat(testWorkingArea.getEmployeeId()).isEqualTo(DEFAULT_EMPLOYEE_ID);
        assertThat(testWorkingArea.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testWorkingArea.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createWorkingAreaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = workingAreaRepository.findAll().size();

        // Create the WorkingArea with an existing ID
        workingArea.setId(1L);
        WorkingAreaDTO workingAreaDTO = workingAreaMapper.toDto(workingArea);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWorkingAreaMockMvc.perform(post("/api/working-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workingAreaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the WorkingArea in the database
        List<WorkingArea> workingAreaList = workingAreaRepository.findAll();
        assertThat(workingAreaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWorkingAreas() throws Exception {
        // Initialize the database
        workingAreaRepository.saveAndFlush(workingArea);

        // Get all the workingAreaList
        restWorkingAreaMockMvc.perform(get("/api/working-areas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(workingArea.getId().intValue())))
            .andExpect(jsonPath("$.[*].streetId").value(hasItem(DEFAULT_STREET_ID.intValue())))
            .andExpect(jsonPath("$.[*].employeeId").value(hasItem(DEFAULT_EMPLOYEE_ID.intValue())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getWorkingArea() throws Exception {
        // Initialize the database
        workingAreaRepository.saveAndFlush(workingArea);

        // Get the workingArea
        restWorkingAreaMockMvc.perform(get("/api/working-areas/{id}", workingArea.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(workingArea.getId().intValue()))
            .andExpect(jsonPath("$.streetId").value(DEFAULT_STREET_ID.intValue()))
            .andExpect(jsonPath("$.employeeId").value(DEFAULT_EMPLOYEE_ID.intValue()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingWorkingArea() throws Exception {
        // Get the workingArea
        restWorkingAreaMockMvc.perform(get("/api/working-areas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWorkingArea() throws Exception {
        // Initialize the database
        workingAreaRepository.saveAndFlush(workingArea);

        int databaseSizeBeforeUpdate = workingAreaRepository.findAll().size();

        // Update the workingArea
        WorkingArea updatedWorkingArea = workingAreaRepository.findById(workingArea.getId()).get();
        // Disconnect from session so that the updates on updatedWorkingArea are not directly saved in db
        em.detach(updatedWorkingArea);
        updatedWorkingArea
            .streetId(UPDATED_STREET_ID)
            .employeeId(UPDATED_EMPLOYEE_ID)
            .createDate(UPDATED_CREATE_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        WorkingAreaDTO workingAreaDTO = workingAreaMapper.toDto(updatedWorkingArea);

        restWorkingAreaMockMvc.perform(put("/api/working-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workingAreaDTO)))
            .andExpect(status().isOk());

        // Validate the WorkingArea in the database
        List<WorkingArea> workingAreaList = workingAreaRepository.findAll();
        assertThat(workingAreaList).hasSize(databaseSizeBeforeUpdate);
        WorkingArea testWorkingArea = workingAreaList.get(workingAreaList.size() - 1);
        assertThat(testWorkingArea.getStreetId()).isEqualTo(UPDATED_STREET_ID);
        assertThat(testWorkingArea.getEmployeeId()).isEqualTo(UPDATED_EMPLOYEE_ID);
        assertThat(testWorkingArea.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testWorkingArea.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingWorkingArea() throws Exception {
        int databaseSizeBeforeUpdate = workingAreaRepository.findAll().size();

        // Create the WorkingArea
        WorkingAreaDTO workingAreaDTO = workingAreaMapper.toDto(workingArea);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWorkingAreaMockMvc.perform(put("/api/working-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workingAreaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the WorkingArea in the database
        List<WorkingArea> workingAreaList = workingAreaRepository.findAll();
        assertThat(workingAreaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWorkingArea() throws Exception {
        // Initialize the database
        workingAreaRepository.saveAndFlush(workingArea);

        int databaseSizeBeforeDelete = workingAreaRepository.findAll().size();

        // Get the workingArea
        restWorkingAreaMockMvc.perform(delete("/api/working-areas/{id}", workingArea.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<WorkingArea> workingAreaList = workingAreaRepository.findAll();
        assertThat(workingAreaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WorkingArea.class);
        WorkingArea workingArea1 = new WorkingArea();
        workingArea1.setId(1L);
        WorkingArea workingArea2 = new WorkingArea();
        workingArea2.setId(workingArea1.getId());
        assertThat(workingArea1).isEqualTo(workingArea2);
        workingArea2.setId(2L);
        assertThat(workingArea1).isNotEqualTo(workingArea2);
        workingArea1.setId(null);
        assertThat(workingArea1).isNotEqualTo(workingArea2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WorkingAreaDTO.class);
        WorkingAreaDTO workingAreaDTO1 = new WorkingAreaDTO();
        workingAreaDTO1.setId(1L);
        WorkingAreaDTO workingAreaDTO2 = new WorkingAreaDTO();
        assertThat(workingAreaDTO1).isNotEqualTo(workingAreaDTO2);
        workingAreaDTO2.setId(workingAreaDTO1.getId());
        assertThat(workingAreaDTO1).isEqualTo(workingAreaDTO2);
        workingAreaDTO2.setId(2L);
        assertThat(workingAreaDTO1).isNotEqualTo(workingAreaDTO2);
        workingAreaDTO1.setId(null);
        assertThat(workingAreaDTO1).isNotEqualTo(workingAreaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(workingAreaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(workingAreaMapper.fromId(null)).isNull();
    }
}
