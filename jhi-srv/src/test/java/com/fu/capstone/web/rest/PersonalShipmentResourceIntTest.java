package com.fu.capstone.web.rest;

import com.fu.capstone.CtsmicroserviceApp;

import com.fu.capstone.domain.PersonalShipment;
import com.fu.capstone.repository.PersonalShipmentRepository;
import com.fu.capstone.service.PersonalShipmentService;
import com.fu.capstone.service.dto.PersonalShipmentDTO;
import com.fu.capstone.service.mapper.PersonalShipmentMapper;
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
 * Test class for the PersonalShipmentResource REST controller.
 *
 * @see PersonalShipmentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CtsmicroserviceApp.class)
public class PersonalShipmentResourceIntTest {

    private static final Long DEFAULT_INVOICE_HEADER_ID = 1L;
    private static final Long UPDATED_INVOICE_HEADER_ID = 2L;

    private static final Long DEFAULT_EMPLOYEE_ID = 1L;
    private static final Long UPDATED_EMPLOYEE_ID = 2L;

    private static final String DEFAULT_SHIPMENT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_SHIPMENT_TYPE = "BBBBBBBBBB";

    private static final Instant DEFAULT_SHIP_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SHIP_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FINISH_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FINISH_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private PersonalShipmentRepository personalShipmentRepository;

    @Autowired
    private PersonalShipmentMapper personalShipmentMapper;
    
    @Autowired
    private PersonalShipmentService personalShipmentService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPersonalShipmentMockMvc;

    private PersonalShipment personalShipment;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PersonalShipmentResource personalShipmentResource = new PersonalShipmentResource(personalShipmentService);
        this.restPersonalShipmentMockMvc = MockMvcBuilders.standaloneSetup(personalShipmentResource)
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
    public static PersonalShipment createEntity(EntityManager em) {
        PersonalShipment personalShipment = new PersonalShipment()
            .invoiceHeaderId(DEFAULT_INVOICE_HEADER_ID)
            .employeeId(DEFAULT_EMPLOYEE_ID)
            .shipmentType(DEFAULT_SHIPMENT_TYPE)
            .shipTime(DEFAULT_SHIP_TIME)
            .finishTime(DEFAULT_FINISH_TIME)
            .status(DEFAULT_STATUS)
            .createDate(DEFAULT_CREATE_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return personalShipment;
    }

    @Before
    public void initTest() {
        personalShipment = createEntity(em);
    }

    @Test
    @Transactional
    public void createPersonalShipment() throws Exception {
        int databaseSizeBeforeCreate = personalShipmentRepository.findAll().size();

        // Create the PersonalShipment
        PersonalShipmentDTO personalShipmentDTO = personalShipmentMapper.toDto(personalShipment);
        restPersonalShipmentMockMvc.perform(post("/api/personal-shipments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personalShipmentDTO)))
            .andExpect(status().isCreated());

        // Validate the PersonalShipment in the database
        List<PersonalShipment> personalShipmentList = personalShipmentRepository.findAll();
        assertThat(personalShipmentList).hasSize(databaseSizeBeforeCreate + 1);
        PersonalShipment testPersonalShipment = personalShipmentList.get(personalShipmentList.size() - 1);
        assertThat(testPersonalShipment.getInvoiceHeaderId()).isEqualTo(DEFAULT_INVOICE_HEADER_ID);
        assertThat(testPersonalShipment.getEmployeeId()).isEqualTo(DEFAULT_EMPLOYEE_ID);
        assertThat(testPersonalShipment.getShipmentType()).isEqualTo(DEFAULT_SHIPMENT_TYPE);
        assertThat(testPersonalShipment.getShipTime()).isEqualTo(DEFAULT_SHIP_TIME);
        assertThat(testPersonalShipment.getFinishTime()).isEqualTo(DEFAULT_FINISH_TIME);
        assertThat(testPersonalShipment.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testPersonalShipment.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testPersonalShipment.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createPersonalShipmentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = personalShipmentRepository.findAll().size();

        // Create the PersonalShipment with an existing ID
        personalShipment.setId(1L);
        PersonalShipmentDTO personalShipmentDTO = personalShipmentMapper.toDto(personalShipment);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonalShipmentMockMvc.perform(post("/api/personal-shipments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personalShipmentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PersonalShipment in the database
        List<PersonalShipment> personalShipmentList = personalShipmentRepository.findAll();
        assertThat(personalShipmentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPersonalShipments() throws Exception {
        // Initialize the database
        personalShipmentRepository.saveAndFlush(personalShipment);

        // Get all the personalShipmentList
        restPersonalShipmentMockMvc.perform(get("/api/personal-shipments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(personalShipment.getId().intValue())))
            .andExpect(jsonPath("$.[*].invoiceHeaderId").value(hasItem(DEFAULT_INVOICE_HEADER_ID.intValue())))
            .andExpect(jsonPath("$.[*].employeeId").value(hasItem(DEFAULT_EMPLOYEE_ID.intValue())))
            .andExpect(jsonPath("$.[*].shipmentType").value(hasItem(DEFAULT_SHIPMENT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].shipTime").value(hasItem(DEFAULT_SHIP_TIME.toString())))
            .andExpect(jsonPath("$.[*].finishTime").value(hasItem(DEFAULT_FINISH_TIME.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getPersonalShipment() throws Exception {
        // Initialize the database
        personalShipmentRepository.saveAndFlush(personalShipment);

        // Get the personalShipment
        restPersonalShipmentMockMvc.perform(get("/api/personal-shipments/{id}", personalShipment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(personalShipment.getId().intValue()))
            .andExpect(jsonPath("$.invoiceHeaderId").value(DEFAULT_INVOICE_HEADER_ID.intValue()))
            .andExpect(jsonPath("$.employeeId").value(DEFAULT_EMPLOYEE_ID.intValue()))
            .andExpect(jsonPath("$.shipmentType").value(DEFAULT_SHIPMENT_TYPE.toString()))
            .andExpect(jsonPath("$.shipTime").value(DEFAULT_SHIP_TIME.toString()))
            .andExpect(jsonPath("$.finishTime").value(DEFAULT_FINISH_TIME.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPersonalShipment() throws Exception {
        // Get the personalShipment
        restPersonalShipmentMockMvc.perform(get("/api/personal-shipments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePersonalShipment() throws Exception {
        // Initialize the database
        personalShipmentRepository.saveAndFlush(personalShipment);

        int databaseSizeBeforeUpdate = personalShipmentRepository.findAll().size();

        // Update the personalShipment
        PersonalShipment updatedPersonalShipment = personalShipmentRepository.findById(personalShipment.getId()).get();
        // Disconnect from session so that the updates on updatedPersonalShipment are not directly saved in db
        em.detach(updatedPersonalShipment);
        updatedPersonalShipment
            .invoiceHeaderId(UPDATED_INVOICE_HEADER_ID)
            .employeeId(UPDATED_EMPLOYEE_ID)
            .shipmentType(UPDATED_SHIPMENT_TYPE)
            .shipTime(UPDATED_SHIP_TIME)
            .finishTime(UPDATED_FINISH_TIME)
            .status(UPDATED_STATUS)
            .createDate(UPDATED_CREATE_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        PersonalShipmentDTO personalShipmentDTO = personalShipmentMapper.toDto(updatedPersonalShipment);

        restPersonalShipmentMockMvc.perform(put("/api/personal-shipments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personalShipmentDTO)))
            .andExpect(status().isOk());

        // Validate the PersonalShipment in the database
        List<PersonalShipment> personalShipmentList = personalShipmentRepository.findAll();
        assertThat(personalShipmentList).hasSize(databaseSizeBeforeUpdate);
        PersonalShipment testPersonalShipment = personalShipmentList.get(personalShipmentList.size() - 1);
        assertThat(testPersonalShipment.getInvoiceHeaderId()).isEqualTo(UPDATED_INVOICE_HEADER_ID);
        assertThat(testPersonalShipment.getEmployeeId()).isEqualTo(UPDATED_EMPLOYEE_ID);
        assertThat(testPersonalShipment.getShipmentType()).isEqualTo(UPDATED_SHIPMENT_TYPE);
        assertThat(testPersonalShipment.getShipTime()).isEqualTo(UPDATED_SHIP_TIME);
        assertThat(testPersonalShipment.getFinishTime()).isEqualTo(UPDATED_FINISH_TIME);
        assertThat(testPersonalShipment.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testPersonalShipment.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testPersonalShipment.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingPersonalShipment() throws Exception {
        int databaseSizeBeforeUpdate = personalShipmentRepository.findAll().size();

        // Create the PersonalShipment
        PersonalShipmentDTO personalShipmentDTO = personalShipmentMapper.toDto(personalShipment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPersonalShipmentMockMvc.perform(put("/api/personal-shipments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personalShipmentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PersonalShipment in the database
        List<PersonalShipment> personalShipmentList = personalShipmentRepository.findAll();
        assertThat(personalShipmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePersonalShipment() throws Exception {
        // Initialize the database
        personalShipmentRepository.saveAndFlush(personalShipment);

        int databaseSizeBeforeDelete = personalShipmentRepository.findAll().size();

        // Get the personalShipment
        restPersonalShipmentMockMvc.perform(delete("/api/personal-shipments/{id}", personalShipment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PersonalShipment> personalShipmentList = personalShipmentRepository.findAll();
        assertThat(personalShipmentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PersonalShipment.class);
        PersonalShipment personalShipment1 = new PersonalShipment();
        personalShipment1.setId(1L);
        PersonalShipment personalShipment2 = new PersonalShipment();
        personalShipment2.setId(personalShipment1.getId());
        assertThat(personalShipment1).isEqualTo(personalShipment2);
        personalShipment2.setId(2L);
        assertThat(personalShipment1).isNotEqualTo(personalShipment2);
        personalShipment1.setId(null);
        assertThat(personalShipment1).isNotEqualTo(personalShipment2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PersonalShipmentDTO.class);
        PersonalShipmentDTO personalShipmentDTO1 = new PersonalShipmentDTO();
        personalShipmentDTO1.setId(1L);
        PersonalShipmentDTO personalShipmentDTO2 = new PersonalShipmentDTO();
        assertThat(personalShipmentDTO1).isNotEqualTo(personalShipmentDTO2);
        personalShipmentDTO2.setId(personalShipmentDTO1.getId());
        assertThat(personalShipmentDTO1).isEqualTo(personalShipmentDTO2);
        personalShipmentDTO2.setId(2L);
        assertThat(personalShipmentDTO1).isNotEqualTo(personalShipmentDTO2);
        personalShipmentDTO1.setId(null);
        assertThat(personalShipmentDTO1).isNotEqualTo(personalShipmentDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(personalShipmentMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(personalShipmentMapper.fromId(null)).isNull();
    }
}
