package com.fu.capstone.web.rest;

import com.fu.capstone.CtsmicroserviceApp;

import com.fu.capstone.domain.TransferPacking;
import com.fu.capstone.repository.TransferPackingRepository;
import com.fu.capstone.service.TransferPackingService;
import com.fu.capstone.service.dto.TransferPackingDTO;
import com.fu.capstone.service.mapper.TransferPackingMapper;
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
 * Test class for the TransferPackingResource REST controller.
 *
 * @see TransferPackingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CtsmicroserviceApp.class)
public class TransferPackingResourceIntTest {

    private static final Long DEFAULT_EMPLOYEE_ID = 1L;
    private static final Long UPDATED_EMPLOYEE_ID = 2L;

    private static final Long DEFAULT_INVOICE_HEADER_ID = 1L;
    private static final Long UPDATED_INVOICE_HEADER_ID = 2L;

    private static final Instant DEFAULT_PACK_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PACK_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_START_HOUR = 1;
    private static final Integer UPDATED_START_HOUR = 2;

    private static final Integer DEFAULT_START_MINUTE = 1;
    private static final Integer UPDATED_START_MINUTE = 2;

    private static final Integer DEFAULT_END_HOUR = 1;
    private static final Integer UPDATED_END_HOUR = 2;

    private static final Integer DEFAULT_END_MINUTE = 1;
    private static final Integer UPDATED_END_MINUTE = 2;

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TransferPackingRepository transferPackingRepository;

    @Autowired
    private TransferPackingMapper transferPackingMapper;
    
    @Autowired
    private TransferPackingService transferPackingService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTransferPackingMockMvc;

    private TransferPacking transferPacking;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransferPackingResource transferPackingResource = new TransferPackingResource(transferPackingService);
        this.restTransferPackingMockMvc = MockMvcBuilders.standaloneSetup(transferPackingResource)
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
    public static TransferPacking createEntity(EntityManager em) {
        TransferPacking transferPacking = new TransferPacking()
            .employeeId(DEFAULT_EMPLOYEE_ID)
            .invoiceHeaderId(DEFAULT_INVOICE_HEADER_ID)
            .packDate(DEFAULT_PACK_DATE)
            .startHour(DEFAULT_START_HOUR)
            .startMinute(DEFAULT_START_MINUTE)
            .endHour(DEFAULT_END_HOUR)
            .endMinute(DEFAULT_END_MINUTE)
            .status(DEFAULT_STATUS)
            .createDate(DEFAULT_CREATE_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return transferPacking;
    }

    @Before
    public void initTest() {
        transferPacking = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransferPacking() throws Exception {
        int databaseSizeBeforeCreate = transferPackingRepository.findAll().size();

        // Create the TransferPacking
        TransferPackingDTO transferPackingDTO = transferPackingMapper.toDto(transferPacking);
        restTransferPackingMockMvc.perform(post("/api/transfer-packings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transferPackingDTO)))
            .andExpect(status().isCreated());

        // Validate the TransferPacking in the database
        List<TransferPacking> transferPackingList = transferPackingRepository.findAll();
        assertThat(transferPackingList).hasSize(databaseSizeBeforeCreate + 1);
        TransferPacking testTransferPacking = transferPackingList.get(transferPackingList.size() - 1);
        assertThat(testTransferPacking.getEmployeeId()).isEqualTo(DEFAULT_EMPLOYEE_ID);
        assertThat(testTransferPacking.getInvoiceHeaderId()).isEqualTo(DEFAULT_INVOICE_HEADER_ID);
        assertThat(testTransferPacking.getPackDate()).isEqualTo(DEFAULT_PACK_DATE);
        assertThat(testTransferPacking.getStartHour()).isEqualTo(DEFAULT_START_HOUR);
        assertThat(testTransferPacking.getStartMinute()).isEqualTo(DEFAULT_START_MINUTE);
        assertThat(testTransferPacking.getEndHour()).isEqualTo(DEFAULT_END_HOUR);
        assertThat(testTransferPacking.getEndMinute()).isEqualTo(DEFAULT_END_MINUTE);
        assertThat(testTransferPacking.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testTransferPacking.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testTransferPacking.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createTransferPackingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transferPackingRepository.findAll().size();

        // Create the TransferPacking with an existing ID
        transferPacking.setId(1L);
        TransferPackingDTO transferPackingDTO = transferPackingMapper.toDto(transferPacking);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransferPackingMockMvc.perform(post("/api/transfer-packings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transferPackingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TransferPacking in the database
        List<TransferPacking> transferPackingList = transferPackingRepository.findAll();
        assertThat(transferPackingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTransferPackings() throws Exception {
        // Initialize the database
        transferPackingRepository.saveAndFlush(transferPacking);

        // Get all the transferPackingList
        restTransferPackingMockMvc.perform(get("/api/transfer-packings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transferPacking.getId().intValue())))
            .andExpect(jsonPath("$.[*].employeeId").value(hasItem(DEFAULT_EMPLOYEE_ID.intValue())))
            .andExpect(jsonPath("$.[*].invoiceHeaderId").value(hasItem(DEFAULT_INVOICE_HEADER_ID.intValue())))
            .andExpect(jsonPath("$.[*].packDate").value(hasItem(DEFAULT_PACK_DATE.toString())))
            .andExpect(jsonPath("$.[*].startHour").value(hasItem(DEFAULT_START_HOUR)))
            .andExpect(jsonPath("$.[*].startMinute").value(hasItem(DEFAULT_START_MINUTE)))
            .andExpect(jsonPath("$.[*].endHour").value(hasItem(DEFAULT_END_HOUR)))
            .andExpect(jsonPath("$.[*].endMinute").value(hasItem(DEFAULT_END_MINUTE)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getTransferPacking() throws Exception {
        // Initialize the database
        transferPackingRepository.saveAndFlush(transferPacking);

        // Get the transferPacking
        restTransferPackingMockMvc.perform(get("/api/transfer-packings/{id}", transferPacking.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transferPacking.getId().intValue()))
            .andExpect(jsonPath("$.employeeId").value(DEFAULT_EMPLOYEE_ID.intValue()))
            .andExpect(jsonPath("$.invoiceHeaderId").value(DEFAULT_INVOICE_HEADER_ID.intValue()))
            .andExpect(jsonPath("$.packDate").value(DEFAULT_PACK_DATE.toString()))
            .andExpect(jsonPath("$.startHour").value(DEFAULT_START_HOUR))
            .andExpect(jsonPath("$.startMinute").value(DEFAULT_START_MINUTE))
            .andExpect(jsonPath("$.endHour").value(DEFAULT_END_HOUR))
            .andExpect(jsonPath("$.endMinute").value(DEFAULT_END_MINUTE))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTransferPacking() throws Exception {
        // Get the transferPacking
        restTransferPackingMockMvc.perform(get("/api/transfer-packings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransferPacking() throws Exception {
        // Initialize the database
        transferPackingRepository.saveAndFlush(transferPacking);

        int databaseSizeBeforeUpdate = transferPackingRepository.findAll().size();

        // Update the transferPacking
        TransferPacking updatedTransferPacking = transferPackingRepository.findById(transferPacking.getId()).get();
        // Disconnect from session so that the updates on updatedTransferPacking are not directly saved in db
        em.detach(updatedTransferPacking);
        updatedTransferPacking
            .employeeId(UPDATED_EMPLOYEE_ID)
            .invoiceHeaderId(UPDATED_INVOICE_HEADER_ID)
            .packDate(UPDATED_PACK_DATE)
            .startHour(UPDATED_START_HOUR)
            .startMinute(UPDATED_START_MINUTE)
            .endHour(UPDATED_END_HOUR)
            .endMinute(UPDATED_END_MINUTE)
            .status(UPDATED_STATUS)
            .createDate(UPDATED_CREATE_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        TransferPackingDTO transferPackingDTO = transferPackingMapper.toDto(updatedTransferPacking);

        restTransferPackingMockMvc.perform(put("/api/transfer-packings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transferPackingDTO)))
            .andExpect(status().isOk());

        // Validate the TransferPacking in the database
        List<TransferPacking> transferPackingList = transferPackingRepository.findAll();
        assertThat(transferPackingList).hasSize(databaseSizeBeforeUpdate);
        TransferPacking testTransferPacking = transferPackingList.get(transferPackingList.size() - 1);
        assertThat(testTransferPacking.getEmployeeId()).isEqualTo(UPDATED_EMPLOYEE_ID);
        assertThat(testTransferPacking.getInvoiceHeaderId()).isEqualTo(UPDATED_INVOICE_HEADER_ID);
        assertThat(testTransferPacking.getPackDate()).isEqualTo(UPDATED_PACK_DATE);
        assertThat(testTransferPacking.getStartHour()).isEqualTo(UPDATED_START_HOUR);
        assertThat(testTransferPacking.getStartMinute()).isEqualTo(UPDATED_START_MINUTE);
        assertThat(testTransferPacking.getEndHour()).isEqualTo(UPDATED_END_HOUR);
        assertThat(testTransferPacking.getEndMinute()).isEqualTo(UPDATED_END_MINUTE);
        assertThat(testTransferPacking.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testTransferPacking.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testTransferPacking.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTransferPacking() throws Exception {
        int databaseSizeBeforeUpdate = transferPackingRepository.findAll().size();

        // Create the TransferPacking
        TransferPackingDTO transferPackingDTO = transferPackingMapper.toDto(transferPacking);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransferPackingMockMvc.perform(put("/api/transfer-packings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transferPackingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TransferPacking in the database
        List<TransferPacking> transferPackingList = transferPackingRepository.findAll();
        assertThat(transferPackingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransferPacking() throws Exception {
        // Initialize the database
        transferPackingRepository.saveAndFlush(transferPacking);

        int databaseSizeBeforeDelete = transferPackingRepository.findAll().size();

        // Get the transferPacking
        restTransferPackingMockMvc.perform(delete("/api/transfer-packings/{id}", transferPacking.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TransferPacking> transferPackingList = transferPackingRepository.findAll();
        assertThat(transferPackingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransferPacking.class);
        TransferPacking transferPacking1 = new TransferPacking();
        transferPacking1.setId(1L);
        TransferPacking transferPacking2 = new TransferPacking();
        transferPacking2.setId(transferPacking1.getId());
        assertThat(transferPacking1).isEqualTo(transferPacking2);
        transferPacking2.setId(2L);
        assertThat(transferPacking1).isNotEqualTo(transferPacking2);
        transferPacking1.setId(null);
        assertThat(transferPacking1).isNotEqualTo(transferPacking2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransferPackingDTO.class);
        TransferPackingDTO transferPackingDTO1 = new TransferPackingDTO();
        transferPackingDTO1.setId(1L);
        TransferPackingDTO transferPackingDTO2 = new TransferPackingDTO();
        assertThat(transferPackingDTO1).isNotEqualTo(transferPackingDTO2);
        transferPackingDTO2.setId(transferPackingDTO1.getId());
        assertThat(transferPackingDTO1).isEqualTo(transferPackingDTO2);
        transferPackingDTO2.setId(2L);
        assertThat(transferPackingDTO1).isNotEqualTo(transferPackingDTO2);
        transferPackingDTO1.setId(null);
        assertThat(transferPackingDTO1).isNotEqualTo(transferPackingDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(transferPackingMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(transferPackingMapper.fromId(null)).isNull();
    }
}
