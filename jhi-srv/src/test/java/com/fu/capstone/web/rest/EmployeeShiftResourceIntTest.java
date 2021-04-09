package com.fu.capstone.web.rest;

import com.fu.capstone.CtsmicroserviceApp;

import com.fu.capstone.domain.EmployeeShift;
import com.fu.capstone.repository.EmployeeShiftRepository;
import com.fu.capstone.service.EmployeeShiftService;
import com.fu.capstone.service.dto.EmployeeShiftDTO;
import com.fu.capstone.service.mapper.EmployeeShiftMapper;
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
 * Test class for the EmployeeShiftResource REST controller.
 *
 * @see EmployeeShiftResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CtsmicroserviceApp.class)
public class EmployeeShiftResourceIntTest {

    private static final Long DEFAULT_EMPLOYEE_ID = 1L;
    private static final Long UPDATED_EMPLOYEE_ID = 2L;

    private static final Long DEFAULT_SHIFT_ID = 1L;
    private static final Long UPDATED_SHIFT_ID = 2L;

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EmployeeShiftRepository employeeShiftRepository;

    @Autowired
    private EmployeeShiftMapper employeeShiftMapper;
    
    @Autowired
    private EmployeeShiftService employeeShiftService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmployeeShiftMockMvc;

    private EmployeeShift employeeShift;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmployeeShiftResource employeeShiftResource = new EmployeeShiftResource(employeeShiftService);
        this.restEmployeeShiftMockMvc = MockMvcBuilders.standaloneSetup(employeeShiftResource)
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
    public static EmployeeShift createEntity(EntityManager em) {
        EmployeeShift employeeShift = new EmployeeShift()
            .employeeId(DEFAULT_EMPLOYEE_ID)
            .shiftId(DEFAULT_SHIFT_ID)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .createDate(DEFAULT_CREATE_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return employeeShift;
    }

    @Before
    public void initTest() {
        employeeShift = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmployeeShift() throws Exception {
        int databaseSizeBeforeCreate = employeeShiftRepository.findAll().size();

        // Create the EmployeeShift
        EmployeeShiftDTO employeeShiftDTO = employeeShiftMapper.toDto(employeeShift);
        restEmployeeShiftMockMvc.perform(post("/api/employee-shifts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeShiftDTO)))
            .andExpect(status().isCreated());

        // Validate the EmployeeShift in the database
        List<EmployeeShift> employeeShiftList = employeeShiftRepository.findAll();
        assertThat(employeeShiftList).hasSize(databaseSizeBeforeCreate + 1);
        EmployeeShift testEmployeeShift = employeeShiftList.get(employeeShiftList.size() - 1);
        assertThat(testEmployeeShift.getEmployeeId()).isEqualTo(DEFAULT_EMPLOYEE_ID);
        assertThat(testEmployeeShift.getShiftId()).isEqualTo(DEFAULT_SHIFT_ID);
        assertThat(testEmployeeShift.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testEmployeeShift.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testEmployeeShift.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testEmployeeShift.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createEmployeeShiftWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = employeeShiftRepository.findAll().size();

        // Create the EmployeeShift with an existing ID
        employeeShift.setId(1L);
        EmployeeShiftDTO employeeShiftDTO = employeeShiftMapper.toDto(employeeShift);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmployeeShiftMockMvc.perform(post("/api/employee-shifts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeShiftDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EmployeeShift in the database
        List<EmployeeShift> employeeShiftList = employeeShiftRepository.findAll();
        assertThat(employeeShiftList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEmployeeShifts() throws Exception {
        // Initialize the database
        employeeShiftRepository.saveAndFlush(employeeShift);

        // Get all the employeeShiftList
        restEmployeeShiftMockMvc.perform(get("/api/employee-shifts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employeeShift.getId().intValue())))
            .andExpect(jsonPath("$.[*].employeeId").value(hasItem(DEFAULT_EMPLOYEE_ID.intValue())))
            .andExpect(jsonPath("$.[*].shiftId").value(hasItem(DEFAULT_SHIFT_ID.intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getEmployeeShift() throws Exception {
        // Initialize the database
        employeeShiftRepository.saveAndFlush(employeeShift);

        // Get the employeeShift
        restEmployeeShiftMockMvc.perform(get("/api/employee-shifts/{id}", employeeShift.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(employeeShift.getId().intValue()))
            .andExpect(jsonPath("$.employeeId").value(DEFAULT_EMPLOYEE_ID.intValue()))
            .andExpect(jsonPath("$.shiftId").value(DEFAULT_SHIFT_ID.intValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmployeeShift() throws Exception {
        // Get the employeeShift
        restEmployeeShiftMockMvc.perform(get("/api/employee-shifts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmployeeShift() throws Exception {
        // Initialize the database
        employeeShiftRepository.saveAndFlush(employeeShift);

        int databaseSizeBeforeUpdate = employeeShiftRepository.findAll().size();

        // Update the employeeShift
        EmployeeShift updatedEmployeeShift = employeeShiftRepository.findById(employeeShift.getId()).get();
        // Disconnect from session so that the updates on updatedEmployeeShift are not directly saved in db
        em.detach(updatedEmployeeShift);
        updatedEmployeeShift
            .employeeId(UPDATED_EMPLOYEE_ID)
            .shiftId(UPDATED_SHIFT_ID)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .createDate(UPDATED_CREATE_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        EmployeeShiftDTO employeeShiftDTO = employeeShiftMapper.toDto(updatedEmployeeShift);

        restEmployeeShiftMockMvc.perform(put("/api/employee-shifts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeShiftDTO)))
            .andExpect(status().isOk());

        // Validate the EmployeeShift in the database
        List<EmployeeShift> employeeShiftList = employeeShiftRepository.findAll();
        assertThat(employeeShiftList).hasSize(databaseSizeBeforeUpdate);
        EmployeeShift testEmployeeShift = employeeShiftList.get(employeeShiftList.size() - 1);
        assertThat(testEmployeeShift.getEmployeeId()).isEqualTo(UPDATED_EMPLOYEE_ID);
        assertThat(testEmployeeShift.getShiftId()).isEqualTo(UPDATED_SHIFT_ID);
        assertThat(testEmployeeShift.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testEmployeeShift.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testEmployeeShift.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testEmployeeShift.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingEmployeeShift() throws Exception {
        int databaseSizeBeforeUpdate = employeeShiftRepository.findAll().size();

        // Create the EmployeeShift
        EmployeeShiftDTO employeeShiftDTO = employeeShiftMapper.toDto(employeeShift);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmployeeShiftMockMvc.perform(put("/api/employee-shifts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeShiftDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EmployeeShift in the database
        List<EmployeeShift> employeeShiftList = employeeShiftRepository.findAll();
        assertThat(employeeShiftList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmployeeShift() throws Exception {
        // Initialize the database
        employeeShiftRepository.saveAndFlush(employeeShift);

        int databaseSizeBeforeDelete = employeeShiftRepository.findAll().size();

        // Get the employeeShift
        restEmployeeShiftMockMvc.perform(delete("/api/employee-shifts/{id}", employeeShift.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmployeeShift> employeeShiftList = employeeShiftRepository.findAll();
        assertThat(employeeShiftList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeShift.class);
        EmployeeShift employeeShift1 = new EmployeeShift();
        employeeShift1.setId(1L);
        EmployeeShift employeeShift2 = new EmployeeShift();
        employeeShift2.setId(employeeShift1.getId());
        assertThat(employeeShift1).isEqualTo(employeeShift2);
        employeeShift2.setId(2L);
        assertThat(employeeShift1).isNotEqualTo(employeeShift2);
        employeeShift1.setId(null);
        assertThat(employeeShift1).isNotEqualTo(employeeShift2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeShiftDTO.class);
        EmployeeShiftDTO employeeShiftDTO1 = new EmployeeShiftDTO();
        employeeShiftDTO1.setId(1L);
        EmployeeShiftDTO employeeShiftDTO2 = new EmployeeShiftDTO();
        assertThat(employeeShiftDTO1).isNotEqualTo(employeeShiftDTO2);
        employeeShiftDTO2.setId(employeeShiftDTO1.getId());
        assertThat(employeeShiftDTO1).isEqualTo(employeeShiftDTO2);
        employeeShiftDTO2.setId(2L);
        assertThat(employeeShiftDTO1).isNotEqualTo(employeeShiftDTO2);
        employeeShiftDTO1.setId(null);
        assertThat(employeeShiftDTO1).isNotEqualTo(employeeShiftDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(employeeShiftMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(employeeShiftMapper.fromId(null)).isNull();
    }
}
