package com.fu.capstone.web.rest;

import com.fu.capstone.CtsmicroserviceApp;

import com.fu.capstone.domain.SubDistrict;
import com.fu.capstone.repository.SubDistrictRepository;
import com.fu.capstone.service.SubDistrictService;
import com.fu.capstone.service.dto.SubDistrictDTO;
import com.fu.capstone.service.mapper.SubDistrictMapper;
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
 * Test class for the SubDistrictResource REST controller.
 *
 * @see SubDistrictResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CtsmicroserviceApp.class)
public class SubDistrictResourceIntTest {

    private static final String DEFAULT_SUB_DISTRICT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SUB_DISTRICT_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private SubDistrictRepository subDistrictRepository;

    @Autowired
    private SubDistrictMapper subDistrictMapper;
    
    @Autowired
    private SubDistrictService subDistrictService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSubDistrictMockMvc;

    private SubDistrict subDistrict;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubDistrictResource subDistrictResource = new SubDistrictResource(subDistrictService);
        this.restSubDistrictMockMvc = MockMvcBuilders.standaloneSetup(subDistrictResource)
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
    public static SubDistrict createEntity(EntityManager em) {
        SubDistrict subDistrict = new SubDistrict()
            .subDistrictName(DEFAULT_SUB_DISTRICT_NAME)
            .createDate(DEFAULT_CREATE_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return subDistrict;
    }

    @Before
    public void initTest() {
        subDistrict = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubDistrict() throws Exception {
        int databaseSizeBeforeCreate = subDistrictRepository.findAll().size();

        // Create the SubDistrict
        SubDistrictDTO subDistrictDTO = subDistrictMapper.toDto(subDistrict);
        restSubDistrictMockMvc.perform(post("/api/sub-districts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subDistrictDTO)))
            .andExpect(status().isCreated());

        // Validate the SubDistrict in the database
        List<SubDistrict> subDistrictList = subDistrictRepository.findAll();
        assertThat(subDistrictList).hasSize(databaseSizeBeforeCreate + 1);
        SubDistrict testSubDistrict = subDistrictList.get(subDistrictList.size() - 1);
        assertThat(testSubDistrict.getSubDistrictName()).isEqualTo(DEFAULT_SUB_DISTRICT_NAME);
        assertThat(testSubDistrict.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testSubDistrict.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createSubDistrictWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subDistrictRepository.findAll().size();

        // Create the SubDistrict with an existing ID
        subDistrict.setId(1L);
        SubDistrictDTO subDistrictDTO = subDistrictMapper.toDto(subDistrict);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubDistrictMockMvc.perform(post("/api/sub-districts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subDistrictDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubDistrict in the database
        List<SubDistrict> subDistrictList = subDistrictRepository.findAll();
        assertThat(subDistrictList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSubDistricts() throws Exception {
        // Initialize the database
        subDistrictRepository.saveAndFlush(subDistrict);

        // Get all the subDistrictList
        restSubDistrictMockMvc.perform(get("/api/sub-districts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subDistrict.getId().intValue())))
            .andExpect(jsonPath("$.[*].subDistrictName").value(hasItem(DEFAULT_SUB_DISTRICT_NAME.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getSubDistrict() throws Exception {
        // Initialize the database
        subDistrictRepository.saveAndFlush(subDistrict);

        // Get the subDistrict
        restSubDistrictMockMvc.perform(get("/api/sub-districts/{id}", subDistrict.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subDistrict.getId().intValue()))
            .andExpect(jsonPath("$.subDistrictName").value(DEFAULT_SUB_DISTRICT_NAME.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSubDistrict() throws Exception {
        // Get the subDistrict
        restSubDistrictMockMvc.perform(get("/api/sub-districts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubDistrict() throws Exception {
        // Initialize the database
        subDistrictRepository.saveAndFlush(subDistrict);

        int databaseSizeBeforeUpdate = subDistrictRepository.findAll().size();

        // Update the subDistrict
        SubDistrict updatedSubDistrict = subDistrictRepository.findById(subDistrict.getId()).get();
        // Disconnect from session so that the updates on updatedSubDistrict are not directly saved in db
        em.detach(updatedSubDistrict);
        updatedSubDistrict
            .subDistrictName(UPDATED_SUB_DISTRICT_NAME)
            .createDate(UPDATED_CREATE_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        SubDistrictDTO subDistrictDTO = subDistrictMapper.toDto(updatedSubDistrict);

        restSubDistrictMockMvc.perform(put("/api/sub-districts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subDistrictDTO)))
            .andExpect(status().isOk());

        // Validate the SubDistrict in the database
        List<SubDistrict> subDistrictList = subDistrictRepository.findAll();
        assertThat(subDistrictList).hasSize(databaseSizeBeforeUpdate);
        SubDistrict testSubDistrict = subDistrictList.get(subDistrictList.size() - 1);
        assertThat(testSubDistrict.getSubDistrictName()).isEqualTo(UPDATED_SUB_DISTRICT_NAME);
        assertThat(testSubDistrict.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testSubDistrict.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingSubDistrict() throws Exception {
        int databaseSizeBeforeUpdate = subDistrictRepository.findAll().size();

        // Create the SubDistrict
        SubDistrictDTO subDistrictDTO = subDistrictMapper.toDto(subDistrict);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubDistrictMockMvc.perform(put("/api/sub-districts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subDistrictDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubDistrict in the database
        List<SubDistrict> subDistrictList = subDistrictRepository.findAll();
        assertThat(subDistrictList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubDistrict() throws Exception {
        // Initialize the database
        subDistrictRepository.saveAndFlush(subDistrict);

        int databaseSizeBeforeDelete = subDistrictRepository.findAll().size();

        // Get the subDistrict
        restSubDistrictMockMvc.perform(delete("/api/sub-districts/{id}", subDistrict.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SubDistrict> subDistrictList = subDistrictRepository.findAll();
        assertThat(subDistrictList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubDistrict.class);
        SubDistrict subDistrict1 = new SubDistrict();
        subDistrict1.setId(1L);
        SubDistrict subDistrict2 = new SubDistrict();
        subDistrict2.setId(subDistrict1.getId());
        assertThat(subDistrict1).isEqualTo(subDistrict2);
        subDistrict2.setId(2L);
        assertThat(subDistrict1).isNotEqualTo(subDistrict2);
        subDistrict1.setId(null);
        assertThat(subDistrict1).isNotEqualTo(subDistrict2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubDistrictDTO.class);
        SubDistrictDTO subDistrictDTO1 = new SubDistrictDTO();
        subDistrictDTO1.setId(1L);
        SubDistrictDTO subDistrictDTO2 = new SubDistrictDTO();
        assertThat(subDistrictDTO1).isNotEqualTo(subDistrictDTO2);
        subDistrictDTO2.setId(subDistrictDTO1.getId());
        assertThat(subDistrictDTO1).isEqualTo(subDistrictDTO2);
        subDistrictDTO2.setId(2L);
        assertThat(subDistrictDTO1).isNotEqualTo(subDistrictDTO2);
        subDistrictDTO1.setId(null);
        assertThat(subDistrictDTO1).isNotEqualTo(subDistrictDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(subDistrictMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(subDistrictMapper.fromId(null)).isNull();
    }
}
