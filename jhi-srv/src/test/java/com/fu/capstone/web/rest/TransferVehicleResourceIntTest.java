package com.fu.capstone.web.rest;

import com.fu.capstone.CtsmicroserviceApp;

import com.fu.capstone.domain.TransferVehicle;
import com.fu.capstone.repository.TransferVehicleRepository;
import com.fu.capstone.service.TransferVehicleService;
import com.fu.capstone.service.dto.TransferVehicleDTO;
import com.fu.capstone.service.mapper.TransferVehicleMapper;
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
 * Test class for the TransferVehicleResource REST controller.
 *
 * @see TransferVehicleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CtsmicroserviceApp.class)
public class TransferVehicleResourceIntTest {

    private static final Long DEFAULT_INVOICE_HEADER_ID = 1L;
    private static final Long UPDATED_INVOICE_HEADER_ID = 2L;

    private static final Instant DEFAULT_SHIP_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SHIP_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_START_HOUR = 1;
    private static final Integer UPDATED_START_HOUR = 2;

    private static final Integer DEFAULT_START_MINUTE = 1;
    private static final Integer UPDATED_START_MINUTE = 2;

    private static final Integer DEFAULT_END_HOUR = 1;
    private static final Integer UPDATED_END_HOUR = 2;

    private static final Integer DEFAULT_END_MINUTE = 1;
    private static final Integer UPDATED_END_MINUTE = 2;

    private static final Long DEFAULT_VEHICLE_ID = 1L;
    private static final Long UPDATED_VEHICLE_ID = 2L;

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TransferVehicleRepository transferVehicleRepository;

    @Autowired
    private TransferVehicleMapper transferVehicleMapper;
    
    @Autowired
    private TransferVehicleService transferVehicleService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTransferVehicleMockMvc;

    private TransferVehicle transferVehicle;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransferVehicleResource transferVehicleResource = new TransferVehicleResource(transferVehicleService);
        this.restTransferVehicleMockMvc = MockMvcBuilders.standaloneSetup(transferVehicleResource)
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
    public static TransferVehicle createEntity(EntityManager em) {
        TransferVehicle transferVehicle = new TransferVehicle()
            .invoiceHeaderId(DEFAULT_INVOICE_HEADER_ID)
            .shipDate(DEFAULT_SHIP_DATE)
            .startHour(DEFAULT_START_HOUR)
            .startMinute(DEFAULT_START_MINUTE)
            .endHour(DEFAULT_END_HOUR)
            .endMinute(DEFAULT_END_MINUTE)
            .vehicleId(DEFAULT_VEHICLE_ID)
            .status(DEFAULT_STATUS)
            .createDate(DEFAULT_CREATE_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return transferVehicle;
    }

    @Before
    public void initTest() {
        transferVehicle = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransferVehicle() throws Exception {
        int databaseSizeBeforeCreate = transferVehicleRepository.findAll().size();

        // Create the TransferVehicle
        TransferVehicleDTO transferVehicleDTO = transferVehicleMapper.toDto(transferVehicle);
        restTransferVehicleMockMvc.perform(post("/api/transfer-vehicles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transferVehicleDTO)))
            .andExpect(status().isCreated());

        // Validate the TransferVehicle in the database
        List<TransferVehicle> transferVehicleList = transferVehicleRepository.findAll();
        assertThat(transferVehicleList).hasSize(databaseSizeBeforeCreate + 1);
        TransferVehicle testTransferVehicle = transferVehicleList.get(transferVehicleList.size() - 1);
        assertThat(testTransferVehicle.getInvoiceHeaderId()).isEqualTo(DEFAULT_INVOICE_HEADER_ID);
        assertThat(testTransferVehicle.getShipDate()).isEqualTo(DEFAULT_SHIP_DATE);
        assertThat(testTransferVehicle.getStartHour()).isEqualTo(DEFAULT_START_HOUR);
        assertThat(testTransferVehicle.getStartMinute()).isEqualTo(DEFAULT_START_MINUTE);
        assertThat(testTransferVehicle.getEndHour()).isEqualTo(DEFAULT_END_HOUR);
        assertThat(testTransferVehicle.getEndMinute()).isEqualTo(DEFAULT_END_MINUTE);
        assertThat(testTransferVehicle.getVehicleId()).isEqualTo(DEFAULT_VEHICLE_ID);
        assertThat(testTransferVehicle.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testTransferVehicle.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testTransferVehicle.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createTransferVehicleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transferVehicleRepository.findAll().size();

        // Create the TransferVehicle with an existing ID
        transferVehicle.setId(1L);
        TransferVehicleDTO transferVehicleDTO = transferVehicleMapper.toDto(transferVehicle);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransferVehicleMockMvc.perform(post("/api/transfer-vehicles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transferVehicleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TransferVehicle in the database
        List<TransferVehicle> transferVehicleList = transferVehicleRepository.findAll();
        assertThat(transferVehicleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTransferVehicles() throws Exception {
        // Initialize the database
        transferVehicleRepository.saveAndFlush(transferVehicle);

        // Get all the transferVehicleList
        restTransferVehicleMockMvc.perform(get("/api/transfer-vehicles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transferVehicle.getId().intValue())))
            .andExpect(jsonPath("$.[*].invoiceHeaderId").value(hasItem(DEFAULT_INVOICE_HEADER_ID.intValue())))
            .andExpect(jsonPath("$.[*].shipDate").value(hasItem(DEFAULT_SHIP_DATE.toString())))
            .andExpect(jsonPath("$.[*].startHour").value(hasItem(DEFAULT_START_HOUR)))
            .andExpect(jsonPath("$.[*].startMinute").value(hasItem(DEFAULT_START_MINUTE)))
            .andExpect(jsonPath("$.[*].endHour").value(hasItem(DEFAULT_END_HOUR)))
            .andExpect(jsonPath("$.[*].endMinute").value(hasItem(DEFAULT_END_MINUTE)))
            .andExpect(jsonPath("$.[*].vehicleId").value(hasItem(DEFAULT_VEHICLE_ID.intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getTransferVehicle() throws Exception {
        // Initialize the database
        transferVehicleRepository.saveAndFlush(transferVehicle);

        // Get the transferVehicle
        restTransferVehicleMockMvc.perform(get("/api/transfer-vehicles/{id}", transferVehicle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transferVehicle.getId().intValue()))
            .andExpect(jsonPath("$.invoiceHeaderId").value(DEFAULT_INVOICE_HEADER_ID.intValue()))
            .andExpect(jsonPath("$.shipDate").value(DEFAULT_SHIP_DATE.toString()))
            .andExpect(jsonPath("$.startHour").value(DEFAULT_START_HOUR))
            .andExpect(jsonPath("$.startMinute").value(DEFAULT_START_MINUTE))
            .andExpect(jsonPath("$.endHour").value(DEFAULT_END_HOUR))
            .andExpect(jsonPath("$.endMinute").value(DEFAULT_END_MINUTE))
            .andExpect(jsonPath("$.vehicleId").value(DEFAULT_VEHICLE_ID.intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTransferVehicle() throws Exception {
        // Get the transferVehicle
        restTransferVehicleMockMvc.perform(get("/api/transfer-vehicles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransferVehicle() throws Exception {
        // Initialize the database
        transferVehicleRepository.saveAndFlush(transferVehicle);

        int databaseSizeBeforeUpdate = transferVehicleRepository.findAll().size();

        // Update the transferVehicle
        TransferVehicle updatedTransferVehicle = transferVehicleRepository.findById(transferVehicle.getId()).get();
        // Disconnect from session so that the updates on updatedTransferVehicle are not directly saved in db
        em.detach(updatedTransferVehicle);
        updatedTransferVehicle
            .invoiceHeaderId(UPDATED_INVOICE_HEADER_ID)
            .shipDate(UPDATED_SHIP_DATE)
            .startHour(UPDATED_START_HOUR)
            .startMinute(UPDATED_START_MINUTE)
            .endHour(UPDATED_END_HOUR)
            .endMinute(UPDATED_END_MINUTE)
            .vehicleId(UPDATED_VEHICLE_ID)
            .status(UPDATED_STATUS)
            .createDate(UPDATED_CREATE_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        TransferVehicleDTO transferVehicleDTO = transferVehicleMapper.toDto(updatedTransferVehicle);

        restTransferVehicleMockMvc.perform(put("/api/transfer-vehicles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transferVehicleDTO)))
            .andExpect(status().isOk());

        // Validate the TransferVehicle in the database
        List<TransferVehicle> transferVehicleList = transferVehicleRepository.findAll();
        assertThat(transferVehicleList).hasSize(databaseSizeBeforeUpdate);
        TransferVehicle testTransferVehicle = transferVehicleList.get(transferVehicleList.size() - 1);
        assertThat(testTransferVehicle.getInvoiceHeaderId()).isEqualTo(UPDATED_INVOICE_HEADER_ID);
        assertThat(testTransferVehicle.getShipDate()).isEqualTo(UPDATED_SHIP_DATE);
        assertThat(testTransferVehicle.getStartHour()).isEqualTo(UPDATED_START_HOUR);
        assertThat(testTransferVehicle.getStartMinute()).isEqualTo(UPDATED_START_MINUTE);
        assertThat(testTransferVehicle.getEndHour()).isEqualTo(UPDATED_END_HOUR);
        assertThat(testTransferVehicle.getEndMinute()).isEqualTo(UPDATED_END_MINUTE);
        assertThat(testTransferVehicle.getVehicleId()).isEqualTo(UPDATED_VEHICLE_ID);
        assertThat(testTransferVehicle.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testTransferVehicle.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testTransferVehicle.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTransferVehicle() throws Exception {
        int databaseSizeBeforeUpdate = transferVehicleRepository.findAll().size();

        // Create the TransferVehicle
        TransferVehicleDTO transferVehicleDTO = transferVehicleMapper.toDto(transferVehicle);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransferVehicleMockMvc.perform(put("/api/transfer-vehicles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transferVehicleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TransferVehicle in the database
        List<TransferVehicle> transferVehicleList = transferVehicleRepository.findAll();
        assertThat(transferVehicleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransferVehicle() throws Exception {
        // Initialize the database
        transferVehicleRepository.saveAndFlush(transferVehicle);

        int databaseSizeBeforeDelete = transferVehicleRepository.findAll().size();

        // Get the transferVehicle
        restTransferVehicleMockMvc.perform(delete("/api/transfer-vehicles/{id}", transferVehicle.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TransferVehicle> transferVehicleList = transferVehicleRepository.findAll();
        assertThat(transferVehicleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransferVehicle.class);
        TransferVehicle transferVehicle1 = new TransferVehicle();
        transferVehicle1.setId(1L);
        TransferVehicle transferVehicle2 = new TransferVehicle();
        transferVehicle2.setId(transferVehicle1.getId());
        assertThat(transferVehicle1).isEqualTo(transferVehicle2);
        transferVehicle2.setId(2L);
        assertThat(transferVehicle1).isNotEqualTo(transferVehicle2);
        transferVehicle1.setId(null);
        assertThat(transferVehicle1).isNotEqualTo(transferVehicle2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransferVehicleDTO.class);
        TransferVehicleDTO transferVehicleDTO1 = new TransferVehicleDTO();
        transferVehicleDTO1.setId(1L);
        TransferVehicleDTO transferVehicleDTO2 = new TransferVehicleDTO();
        assertThat(transferVehicleDTO1).isNotEqualTo(transferVehicleDTO2);
        transferVehicleDTO2.setId(transferVehicleDTO1.getId());
        assertThat(transferVehicleDTO1).isEqualTo(transferVehicleDTO2);
        transferVehicleDTO2.setId(2L);
        assertThat(transferVehicleDTO1).isNotEqualTo(transferVehicleDTO2);
        transferVehicleDTO1.setId(null);
        assertThat(transferVehicleDTO1).isNotEqualTo(transferVehicleDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(transferVehicleMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(transferVehicleMapper.fromId(null)).isNull();
    }
}
