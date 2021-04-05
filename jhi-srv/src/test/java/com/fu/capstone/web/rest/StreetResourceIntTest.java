package com.fu.capstone.web.rest;

import com.fu.capstone.CtsmicroserviceApp;

import com.fu.capstone.domain.Street;
import com.fu.capstone.repository.StreetRepository;
import com.fu.capstone.service.StreetService;
import com.fu.capstone.service.dto.StreetDTO;
import com.fu.capstone.service.mapper.StreetMapper;
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
 * Test class for the StreetResource REST controller.
 *
 * @see StreetResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CtsmicroserviceApp.class)
public class StreetResourceIntTest {

    private static final String DEFAULT_STREET_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STREET_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private StreetRepository streetRepository;

    @Autowired
    private StreetMapper streetMapper;
    
    @Autowired
    private StreetService streetService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStreetMockMvc;

    private Street street;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StreetResource streetResource = new StreetResource(streetService);
        this.restStreetMockMvc = MockMvcBuilders.standaloneSetup(streetResource)
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
    public static Street createEntity(EntityManager em) {
        Street street = new Street()
            .streetName(DEFAULT_STREET_NAME)
            .createDate(DEFAULT_CREATE_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return street;
    }

    @Before
    public void initTest() {
        street = createEntity(em);
    }

    @Test
    @Transactional
    public void createStreet() throws Exception {
        int databaseSizeBeforeCreate = streetRepository.findAll().size();

        // Create the Street
        StreetDTO streetDTO = streetMapper.toDto(street);
        restStreetMockMvc.perform(post("/api/streets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(streetDTO)))
            .andExpect(status().isCreated());

        // Validate the Street in the database
        List<Street> streetList = streetRepository.findAll();
        assertThat(streetList).hasSize(databaseSizeBeforeCreate + 1);
        Street testStreet = streetList.get(streetList.size() - 1);
        assertThat(testStreet.getStreetName()).isEqualTo(DEFAULT_STREET_NAME);
        assertThat(testStreet.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testStreet.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createStreetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = streetRepository.findAll().size();

        // Create the Street with an existing ID
        street.setId(1L);
        StreetDTO streetDTO = streetMapper.toDto(street);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStreetMockMvc.perform(post("/api/streets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(streetDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Street in the database
        List<Street> streetList = streetRepository.findAll();
        assertThat(streetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStreets() throws Exception {
        // Initialize the database
        streetRepository.saveAndFlush(street);

        // Get all the streetList
        restStreetMockMvc.perform(get("/api/streets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(street.getId().intValue())))
            .andExpect(jsonPath("$.[*].streetName").value(hasItem(DEFAULT_STREET_NAME.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getStreet() throws Exception {
        // Initialize the database
        streetRepository.saveAndFlush(street);

        // Get the street
        restStreetMockMvc.perform(get("/api/streets/{id}", street.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(street.getId().intValue()))
            .andExpect(jsonPath("$.streetName").value(DEFAULT_STREET_NAME.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStreet() throws Exception {
        // Get the street
        restStreetMockMvc.perform(get("/api/streets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStreet() throws Exception {
        // Initialize the database
        streetRepository.saveAndFlush(street);

        int databaseSizeBeforeUpdate = streetRepository.findAll().size();

        // Update the street
        Street updatedStreet = streetRepository.findById(street.getId()).get();
        // Disconnect from session so that the updates on updatedStreet are not directly saved in db
        em.detach(updatedStreet);
        updatedStreet
            .streetName(UPDATED_STREET_NAME)
            .createDate(UPDATED_CREATE_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        StreetDTO streetDTO = streetMapper.toDto(updatedStreet);

        restStreetMockMvc.perform(put("/api/streets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(streetDTO)))
            .andExpect(status().isOk());

        // Validate the Street in the database
        List<Street> streetList = streetRepository.findAll();
        assertThat(streetList).hasSize(databaseSizeBeforeUpdate);
        Street testStreet = streetList.get(streetList.size() - 1);
        assertThat(testStreet.getStreetName()).isEqualTo(UPDATED_STREET_NAME);
        assertThat(testStreet.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testStreet.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingStreet() throws Exception {
        int databaseSizeBeforeUpdate = streetRepository.findAll().size();

        // Create the Street
        StreetDTO streetDTO = streetMapper.toDto(street);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStreetMockMvc.perform(put("/api/streets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(streetDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Street in the database
        List<Street> streetList = streetRepository.findAll();
        assertThat(streetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStreet() throws Exception {
        // Initialize the database
        streetRepository.saveAndFlush(street);

        int databaseSizeBeforeDelete = streetRepository.findAll().size();

        // Get the street
        restStreetMockMvc.perform(delete("/api/streets/{id}", street.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Street> streetList = streetRepository.findAll();
        assertThat(streetList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Street.class);
        Street street1 = new Street();
        street1.setId(1L);
        Street street2 = new Street();
        street2.setId(street1.getId());
        assertThat(street1).isEqualTo(street2);
        street2.setId(2L);
        assertThat(street1).isNotEqualTo(street2);
        street1.setId(null);
        assertThat(street1).isNotEqualTo(street2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StreetDTO.class);
        StreetDTO streetDTO1 = new StreetDTO();
        streetDTO1.setId(1L);
        StreetDTO streetDTO2 = new StreetDTO();
        assertThat(streetDTO1).isNotEqualTo(streetDTO2);
        streetDTO2.setId(streetDTO1.getId());
        assertThat(streetDTO1).isEqualTo(streetDTO2);
        streetDTO2.setId(2L);
        assertThat(streetDTO1).isNotEqualTo(streetDTO2);
        streetDTO1.setId(null);
        assertThat(streetDTO1).isNotEqualTo(streetDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(streetMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(streetMapper.fromId(null)).isNull();
    }
}
