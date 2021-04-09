package com.fu.capstone.web.rest;

import com.fu.capstone.CtsmicroserviceApp;

import com.fu.capstone.domain.Shift;
import com.fu.capstone.repository.ShiftRepository;
import com.fu.capstone.service.ShiftService;
import com.fu.capstone.service.dto.ShiftDTO;
import com.fu.capstone.service.mapper.ShiftMapper;
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
 * Test class for the ShiftResource REST controller.
 *
 * @see ShiftResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CtsmicroserviceApp.class)
public class ShiftResourceIntTest {

    private static final String DEFAULT_SHIFT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SHIFT_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_START_HOUR = 1;
    private static final Integer UPDATED_START_HOUR = 2;

    private static final Integer DEFAULT_START_MINUTE = 1;
    private static final Integer UPDATED_START_MINUTE = 2;

    private static final Integer DEFAULT_END_HOUR = 1;
    private static final Integer UPDATED_END_HOUR = 2;

    private static final Integer DEFAULT_END_MINUTE = 1;
    private static final Integer UPDATED_END_MINUTE = 2;

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ShiftRepository shiftRepository;

    @Autowired
    private ShiftMapper shiftMapper;
    
    @Autowired
    private ShiftService shiftService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restShiftMockMvc;

    private Shift shift;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ShiftResource shiftResource = new ShiftResource(shiftService);
        this.restShiftMockMvc = MockMvcBuilders.standaloneSetup(shiftResource)
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
    public static Shift createEntity(EntityManager em) {
        Shift shift = new Shift()
            .shiftName(DEFAULT_SHIFT_NAME)
            .startHour(DEFAULT_START_HOUR)
            .startMinute(DEFAULT_START_MINUTE)
            .endHour(DEFAULT_END_HOUR)
            .endMinute(DEFAULT_END_MINUTE)
            .createDate(DEFAULT_CREATE_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return shift;
    }

    @Before
    public void initTest() {
        shift = createEntity(em);
    }

    @Test
    @Transactional
    public void createShift() throws Exception {
        int databaseSizeBeforeCreate = shiftRepository.findAll().size();

        // Create the Shift
        ShiftDTO shiftDTO = shiftMapper.toDto(shift);
        restShiftMockMvc.perform(post("/api/shifts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shiftDTO)))
            .andExpect(status().isCreated());

        // Validate the Shift in the database
        List<Shift> shiftList = shiftRepository.findAll();
        assertThat(shiftList).hasSize(databaseSizeBeforeCreate + 1);
        Shift testShift = shiftList.get(shiftList.size() - 1);
        assertThat(testShift.getShiftName()).isEqualTo(DEFAULT_SHIFT_NAME);
        assertThat(testShift.getStartHour()).isEqualTo(DEFAULT_START_HOUR);
        assertThat(testShift.getStartMinute()).isEqualTo(DEFAULT_START_MINUTE);
        assertThat(testShift.getEndHour()).isEqualTo(DEFAULT_END_HOUR);
        assertThat(testShift.getEndMinute()).isEqualTo(DEFAULT_END_MINUTE);
        assertThat(testShift.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testShift.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createShiftWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = shiftRepository.findAll().size();

        // Create the Shift with an existing ID
        shift.setId(1L);
        ShiftDTO shiftDTO = shiftMapper.toDto(shift);

        // An entity with an existing ID cannot be created, so this API call must fail
        restShiftMockMvc.perform(post("/api/shifts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shiftDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Shift in the database
        List<Shift> shiftList = shiftRepository.findAll();
        assertThat(shiftList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllShifts() throws Exception {
        // Initialize the database
        shiftRepository.saveAndFlush(shift);

        // Get all the shiftList
        restShiftMockMvc.perform(get("/api/shifts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shift.getId().intValue())))
            .andExpect(jsonPath("$.[*].shiftName").value(hasItem(DEFAULT_SHIFT_NAME.toString())))
            .andExpect(jsonPath("$.[*].startHour").value(hasItem(DEFAULT_START_HOUR)))
            .andExpect(jsonPath("$.[*].startMinute").value(hasItem(DEFAULT_START_MINUTE)))
            .andExpect(jsonPath("$.[*].endHour").value(hasItem(DEFAULT_END_HOUR)))
            .andExpect(jsonPath("$.[*].endMinute").value(hasItem(DEFAULT_END_MINUTE)))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getShift() throws Exception {
        // Initialize the database
        shiftRepository.saveAndFlush(shift);

        // Get the shift
        restShiftMockMvc.perform(get("/api/shifts/{id}", shift.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(shift.getId().intValue()))
            .andExpect(jsonPath("$.shiftName").value(DEFAULT_SHIFT_NAME.toString()))
            .andExpect(jsonPath("$.startHour").value(DEFAULT_START_HOUR))
            .andExpect(jsonPath("$.startMinute").value(DEFAULT_START_MINUTE))
            .andExpect(jsonPath("$.endHour").value(DEFAULT_END_HOUR))
            .andExpect(jsonPath("$.endMinute").value(DEFAULT_END_MINUTE))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingShift() throws Exception {
        // Get the shift
        restShiftMockMvc.perform(get("/api/shifts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateShift() throws Exception {
        // Initialize the database
        shiftRepository.saveAndFlush(shift);

        int databaseSizeBeforeUpdate = shiftRepository.findAll().size();

        // Update the shift
        Shift updatedShift = shiftRepository.findById(shift.getId()).get();
        // Disconnect from session so that the updates on updatedShift are not directly saved in db
        em.detach(updatedShift);
        updatedShift
            .shiftName(UPDATED_SHIFT_NAME)
            .startHour(UPDATED_START_HOUR)
            .startMinute(UPDATED_START_MINUTE)
            .endHour(UPDATED_END_HOUR)
            .endMinute(UPDATED_END_MINUTE)
            .createDate(UPDATED_CREATE_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        ShiftDTO shiftDTO = shiftMapper.toDto(updatedShift);

        restShiftMockMvc.perform(put("/api/shifts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shiftDTO)))
            .andExpect(status().isOk());

        // Validate the Shift in the database
        List<Shift> shiftList = shiftRepository.findAll();
        assertThat(shiftList).hasSize(databaseSizeBeforeUpdate);
        Shift testShift = shiftList.get(shiftList.size() - 1);
        assertThat(testShift.getShiftName()).isEqualTo(UPDATED_SHIFT_NAME);
        assertThat(testShift.getStartHour()).isEqualTo(UPDATED_START_HOUR);
        assertThat(testShift.getStartMinute()).isEqualTo(UPDATED_START_MINUTE);
        assertThat(testShift.getEndHour()).isEqualTo(UPDATED_END_HOUR);
        assertThat(testShift.getEndMinute()).isEqualTo(UPDATED_END_MINUTE);
        assertThat(testShift.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testShift.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingShift() throws Exception {
        int databaseSizeBeforeUpdate = shiftRepository.findAll().size();

        // Create the Shift
        ShiftDTO shiftDTO = shiftMapper.toDto(shift);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShiftMockMvc.perform(put("/api/shifts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shiftDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Shift in the database
        List<Shift> shiftList = shiftRepository.findAll();
        assertThat(shiftList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteShift() throws Exception {
        // Initialize the database
        shiftRepository.saveAndFlush(shift);

        int databaseSizeBeforeDelete = shiftRepository.findAll().size();

        // Get the shift
        restShiftMockMvc.perform(delete("/api/shifts/{id}", shift.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Shift> shiftList = shiftRepository.findAll();
        assertThat(shiftList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Shift.class);
        Shift shift1 = new Shift();
        shift1.setId(1L);
        Shift shift2 = new Shift();
        shift2.setId(shift1.getId());
        assertThat(shift1).isEqualTo(shift2);
        shift2.setId(2L);
        assertThat(shift1).isNotEqualTo(shift2);
        shift1.setId(null);
        assertThat(shift1).isNotEqualTo(shift2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ShiftDTO.class);
        ShiftDTO shiftDTO1 = new ShiftDTO();
        shiftDTO1.setId(1L);
        ShiftDTO shiftDTO2 = new ShiftDTO();
        assertThat(shiftDTO1).isNotEqualTo(shiftDTO2);
        shiftDTO2.setId(shiftDTO1.getId());
        assertThat(shiftDTO1).isEqualTo(shiftDTO2);
        shiftDTO2.setId(2L);
        assertThat(shiftDTO1).isNotEqualTo(shiftDTO2);
        shiftDTO1.setId(null);
        assertThat(shiftDTO1).isNotEqualTo(shiftDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(shiftMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(shiftMapper.fromId(null)).isNull();
    }
}
