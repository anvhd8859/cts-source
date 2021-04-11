package com.fu.capstone.web.rest;

import com.fu.capstone.CtsmicroserviceApp;

import com.fu.capstone.domain.ReceiptNote;
import com.fu.capstone.repository.ReceiptNoteRepository;
import com.fu.capstone.service.ReceiptNoteService;
import com.fu.capstone.service.dto.ReceiptNoteDTO;
import com.fu.capstone.service.mapper.ReceiptNoteMapper;
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
 * Test class for the ReceiptNoteResource REST controller.
 *
 * @see ReceiptNoteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CtsmicroserviceApp.class)
public class ReceiptNoteResourceIntTest {

    private static final Long DEFAULT_EMPLOYEE_ID = 1L;
    private static final Long UPDATED_EMPLOYEE_ID = 2L;

    private static final Long DEFAULT_INVOICE_HEADER_ID = 1L;
    private static final Long UPDATED_INVOICE_HEADER_ID = 2L;

    private static final String DEFAULT_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_NOTE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_CUSTOMER_CONFIRM = false;
    private static final Boolean UPDATED_CUSTOMER_CONFIRM = true;

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ReceiptNoteRepository receiptNoteRepository;

    @Autowired
    private ReceiptNoteMapper receiptNoteMapper;
    
    @Autowired
    private ReceiptNoteService receiptNoteService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReceiptNoteMockMvc;

    private ReceiptNote receiptNote;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReceiptNoteResource receiptNoteResource = new ReceiptNoteResource(receiptNoteService);
        this.restReceiptNoteMockMvc = MockMvcBuilders.standaloneSetup(receiptNoteResource)
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
    public static ReceiptNote createEntity(EntityManager em) {
        ReceiptNote receiptNote = new ReceiptNote()
            .employeeId(DEFAULT_EMPLOYEE_ID)
            .invoiceHeaderId(DEFAULT_INVOICE_HEADER_ID)
            .note(DEFAULT_NOTE)
            .customerConfirm(DEFAULT_CUSTOMER_CONFIRM)
            .createDate(DEFAULT_CREATE_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return receiptNote;
    }

    @Before
    public void initTest() {
        receiptNote = createEntity(em);
    }

    @Test
    @Transactional
    public void createReceiptNote() throws Exception {
        int databaseSizeBeforeCreate = receiptNoteRepository.findAll().size();

        // Create the ReceiptNote
        ReceiptNoteDTO receiptNoteDTO = receiptNoteMapper.toDto(receiptNote);
        restReceiptNoteMockMvc.perform(post("/api/receipt-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptNoteDTO)))
            .andExpect(status().isCreated());

        // Validate the ReceiptNote in the database
        List<ReceiptNote> receiptNoteList = receiptNoteRepository.findAll();
        assertThat(receiptNoteList).hasSize(databaseSizeBeforeCreate + 1);
        ReceiptNote testReceiptNote = receiptNoteList.get(receiptNoteList.size() - 1);
        assertThat(testReceiptNote.getEmployeeId()).isEqualTo(DEFAULT_EMPLOYEE_ID);
        assertThat(testReceiptNote.getInvoiceHeaderId()).isEqualTo(DEFAULT_INVOICE_HEADER_ID);
        assertThat(testReceiptNote.getNote()).isEqualTo(DEFAULT_NOTE);
        assertThat(testReceiptNote.isCustomerConfirm()).isEqualTo(DEFAULT_CUSTOMER_CONFIRM);
        assertThat(testReceiptNote.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testReceiptNote.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createReceiptNoteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = receiptNoteRepository.findAll().size();

        // Create the ReceiptNote with an existing ID
        receiptNote.setId(1L);
        ReceiptNoteDTO receiptNoteDTO = receiptNoteMapper.toDto(receiptNote);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReceiptNoteMockMvc.perform(post("/api/receipt-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptNoteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ReceiptNote in the database
        List<ReceiptNote> receiptNoteList = receiptNoteRepository.findAll();
        assertThat(receiptNoteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllReceiptNotes() throws Exception {
        // Initialize the database
        receiptNoteRepository.saveAndFlush(receiptNote);

        // Get all the receiptNoteList
        restReceiptNoteMockMvc.perform(get("/api/receipt-notes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(receiptNote.getId().intValue())))
            .andExpect(jsonPath("$.[*].employeeId").value(hasItem(DEFAULT_EMPLOYEE_ID.intValue())))
            .andExpect(jsonPath("$.[*].invoiceHeaderId").value(hasItem(DEFAULT_INVOICE_HEADER_ID.intValue())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE.toString())))
            .andExpect(jsonPath("$.[*].customerConfirm").value(hasItem(DEFAULT_CUSTOMER_CONFIRM.booleanValue())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getReceiptNote() throws Exception {
        // Initialize the database
        receiptNoteRepository.saveAndFlush(receiptNote);

        // Get the receiptNote
        restReceiptNoteMockMvc.perform(get("/api/receipt-notes/{id}", receiptNote.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(receiptNote.getId().intValue()))
            .andExpect(jsonPath("$.employeeId").value(DEFAULT_EMPLOYEE_ID.intValue()))
            .andExpect(jsonPath("$.invoiceHeaderId").value(DEFAULT_INVOICE_HEADER_ID.intValue()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE.toString()))
            .andExpect(jsonPath("$.customerConfirm").value(DEFAULT_CUSTOMER_CONFIRM.booleanValue()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReceiptNote() throws Exception {
        // Get the receiptNote
        restReceiptNoteMockMvc.perform(get("/api/receipt-notes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReceiptNote() throws Exception {
        // Initialize the database
        receiptNoteRepository.saveAndFlush(receiptNote);

        int databaseSizeBeforeUpdate = receiptNoteRepository.findAll().size();

        // Update the receiptNote
        ReceiptNote updatedReceiptNote = receiptNoteRepository.findById(receiptNote.getId()).get();
        // Disconnect from session so that the updates on updatedReceiptNote are not directly saved in db
        em.detach(updatedReceiptNote);
        updatedReceiptNote
            .employeeId(UPDATED_EMPLOYEE_ID)
            .invoiceHeaderId(UPDATED_INVOICE_HEADER_ID)
            .note(UPDATED_NOTE)
            .customerConfirm(UPDATED_CUSTOMER_CONFIRM)
            .createDate(UPDATED_CREATE_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        ReceiptNoteDTO receiptNoteDTO = receiptNoteMapper.toDto(updatedReceiptNote);

        restReceiptNoteMockMvc.perform(put("/api/receipt-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptNoteDTO)))
            .andExpect(status().isOk());

        // Validate the ReceiptNote in the database
        List<ReceiptNote> receiptNoteList = receiptNoteRepository.findAll();
        assertThat(receiptNoteList).hasSize(databaseSizeBeforeUpdate);
        ReceiptNote testReceiptNote = receiptNoteList.get(receiptNoteList.size() - 1);
        assertThat(testReceiptNote.getEmployeeId()).isEqualTo(UPDATED_EMPLOYEE_ID);
        assertThat(testReceiptNote.getInvoiceHeaderId()).isEqualTo(UPDATED_INVOICE_HEADER_ID);
        assertThat(testReceiptNote.getNote()).isEqualTo(UPDATED_NOTE);
        assertThat(testReceiptNote.isCustomerConfirm()).isEqualTo(UPDATED_CUSTOMER_CONFIRM);
        assertThat(testReceiptNote.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testReceiptNote.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingReceiptNote() throws Exception {
        int databaseSizeBeforeUpdate = receiptNoteRepository.findAll().size();

        // Create the ReceiptNote
        ReceiptNoteDTO receiptNoteDTO = receiptNoteMapper.toDto(receiptNote);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReceiptNoteMockMvc.perform(put("/api/receipt-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptNoteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ReceiptNote in the database
        List<ReceiptNote> receiptNoteList = receiptNoteRepository.findAll();
        assertThat(receiptNoteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReceiptNote() throws Exception {
        // Initialize the database
        receiptNoteRepository.saveAndFlush(receiptNote);

        int databaseSizeBeforeDelete = receiptNoteRepository.findAll().size();

        // Get the receiptNote
        restReceiptNoteMockMvc.perform(delete("/api/receipt-notes/{id}", receiptNote.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReceiptNote> receiptNoteList = receiptNoteRepository.findAll();
        assertThat(receiptNoteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReceiptNote.class);
        ReceiptNote receiptNote1 = new ReceiptNote();
        receiptNote1.setId(1L);
        ReceiptNote receiptNote2 = new ReceiptNote();
        receiptNote2.setId(receiptNote1.getId());
        assertThat(receiptNote1).isEqualTo(receiptNote2);
        receiptNote2.setId(2L);
        assertThat(receiptNote1).isNotEqualTo(receiptNote2);
        receiptNote1.setId(null);
        assertThat(receiptNote1).isNotEqualTo(receiptNote2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReceiptNoteDTO.class);
        ReceiptNoteDTO receiptNoteDTO1 = new ReceiptNoteDTO();
        receiptNoteDTO1.setId(1L);
        ReceiptNoteDTO receiptNoteDTO2 = new ReceiptNoteDTO();
        assertThat(receiptNoteDTO1).isNotEqualTo(receiptNoteDTO2);
        receiptNoteDTO2.setId(receiptNoteDTO1.getId());
        assertThat(receiptNoteDTO1).isEqualTo(receiptNoteDTO2);
        receiptNoteDTO2.setId(2L);
        assertThat(receiptNoteDTO1).isNotEqualTo(receiptNoteDTO2);
        receiptNoteDTO1.setId(null);
        assertThat(receiptNoteDTO1).isNotEqualTo(receiptNoteDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(receiptNoteMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(receiptNoteMapper.fromId(null)).isNull();
    }
}
