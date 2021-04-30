package com.fu.capstone.web.rest;

import com.fu.capstone.CtsmicroserviceApp;

import com.fu.capstone.domain.InvoiceHeader;
import com.fu.capstone.repository.InvoiceHeaderRepository;
import com.fu.capstone.service.InvoiceHeaderService;
import com.fu.capstone.service.dto.InvoiceHeaderDTO;
import com.fu.capstone.service.mapper.InvoiceHeaderMapper;
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
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.fu.capstone.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the InvoiceHeaderResource REST controller.
 *
 * @see InvoiceHeaderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CtsmicroserviceApp.class)
public class InvoiceHeaderResourceIntTest {

    private static final Long DEFAULT_CUSTOMER_ID = 1L;
    private static final Long UPDATED_CUSTOMER_ID = 2L;

    private static final Long DEFAULT_OFFICE_ID = 1L;
    private static final Long UPDATED_OFFICE_ID = 2L;

    private static final String DEFAULT_INVOICE_NO = "AAAAAAAAAA";
    private static final String UPDATED_INVOICE_NO = "BBBBBBBBBB";

    private static final String DEFAULT_INVOICE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_INVOICE_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_START_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_START_ADDRESS = "BBBBBBBBBB";

    private static final Long DEFAULT_START_STREET_ID = 1L;
    private static final Long UPDATED_START_STREET_ID = 2L;

    private static final String DEFAULT_DESTINATION_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_DESTINATION_ADDRESS = "BBBBBBBBBB";

    private static final Long DEFAULT_DESTINATION_STREET_ID = 1L;
    private static final Long UPDATED_DESTINATION_STREET_ID = 2L;

    private static final String DEFAULT_RECEIVER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_RECEIVER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_RECEIVER_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_RECEIVER_PHONE = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_SUB_TOTAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_SUB_TOTAL = new BigDecimal(2);

    private static final BigDecimal DEFAULT_TAX_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_TAX_AMOUNT = new BigDecimal(2);

    private static final BigDecimal DEFAULT_TOTAL_DUE = new BigDecimal(1);
    private static final BigDecimal UPDATED_TOTAL_DUE = new BigDecimal(2);

    private static final String DEFAULT_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_NOTE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_CANCEL = false;
    private static final Boolean UPDATED_CANCEL = true;

    private static final String DEFAULT_CANCEL_REASON = "AAAAAAAAAA";
    private static final String UPDATED_CANCEL_REASON = "BBBBBBBBBB";

    private static final Boolean DEFAULT_CUSTOMER_CONFIRM = false;
    private static final Boolean UPDATED_CUSTOMER_CONFIRM = true;

    private static final String DEFAULT_CHANGE_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_CHANGE_NOTE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_FINISH = false;
    private static final Boolean UPDATED_FINISH = true;

    private static final Instant DEFAULT_RECEIVE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_RECEIVE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DUE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DUE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FINISH_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FINISH_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private InvoiceHeaderRepository invoiceHeaderRepository;

    @Autowired
    private InvoiceHeaderMapper invoiceHeaderMapper;
    
    @Autowired
    private InvoiceHeaderService invoiceHeaderService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInvoiceHeaderMockMvc;

    private InvoiceHeader invoiceHeader;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InvoiceHeaderResource invoiceHeaderResource = new InvoiceHeaderResource(invoiceHeaderService);
        this.restInvoiceHeaderMockMvc = MockMvcBuilders.standaloneSetup(invoiceHeaderResource)
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
    public static InvoiceHeader createEntity(EntityManager em) {
        InvoiceHeader invoiceHeader = new InvoiceHeader()
            .customerId(DEFAULT_CUSTOMER_ID)
            .officeId(DEFAULT_OFFICE_ID)
            .invoiceNo(DEFAULT_INVOICE_NO)
            .invoiceType(DEFAULT_INVOICE_TYPE)
            .status(DEFAULT_STATUS)
            .startAddress(DEFAULT_START_ADDRESS)
            .startStreetId(DEFAULT_START_STREET_ID)
            .destinationAddress(DEFAULT_DESTINATION_ADDRESS)
            .destinationStreetId(DEFAULT_DESTINATION_STREET_ID)
            .receiverName(DEFAULT_RECEIVER_NAME)
            .receiverPhone(DEFAULT_RECEIVER_PHONE)
            .subTotal(DEFAULT_SUB_TOTAL)
            .taxAmount(DEFAULT_TAX_AMOUNT)
            .totalDue(DEFAULT_TOTAL_DUE)
            .note(DEFAULT_NOTE)
            .cancel(DEFAULT_CANCEL)
            .cancelReason(DEFAULT_CANCEL_REASON)
            .customerConfirm(DEFAULT_CUSTOMER_CONFIRM)
            .changeNote(DEFAULT_CHANGE_NOTE)
            .finish(DEFAULT_FINISH)
            .reviewDate(DEFAULT_RECEIVE_DATE)
            .dueDate(DEFAULT_DUE_DATE)
            .finishDate(DEFAULT_FINISH_DATE)
            .createDate(DEFAULT_CREATE_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return invoiceHeader;
    }

    @Before
    public void initTest() {
        invoiceHeader = createEntity(em);
    }

    @Test
    @Transactional
    public void createInvoiceHeader() throws Exception {
        int databaseSizeBeforeCreate = invoiceHeaderRepository.findAll().size();

        // Create the InvoiceHeader
        InvoiceHeaderDTO invoiceHeaderDTO = invoiceHeaderMapper.toDto(invoiceHeader);
        restInvoiceHeaderMockMvc.perform(post("/api/invoice-headers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoiceHeaderDTO)))
            .andExpect(status().isCreated());

        // Validate the InvoiceHeader in the database
        List<InvoiceHeader> invoiceHeaderList = invoiceHeaderRepository.findAll();
        assertThat(invoiceHeaderList).hasSize(databaseSizeBeforeCreate + 1);
        InvoiceHeader testInvoiceHeader = invoiceHeaderList.get(invoiceHeaderList.size() - 1);
        assertThat(testInvoiceHeader.getCustomerId()).isEqualTo(DEFAULT_CUSTOMER_ID);
        assertThat(testInvoiceHeader.getOfficeId()).isEqualTo(DEFAULT_OFFICE_ID);
        assertThat(testInvoiceHeader.getInvoiceNo()).isEqualTo(DEFAULT_INVOICE_NO);
        assertThat(testInvoiceHeader.getInvoiceType()).isEqualTo(DEFAULT_INVOICE_TYPE);
        assertThat(testInvoiceHeader.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testInvoiceHeader.getStartAddress()).isEqualTo(DEFAULT_START_ADDRESS);
        assertThat(testInvoiceHeader.getStartStreetId()).isEqualTo(DEFAULT_START_STREET_ID);
        assertThat(testInvoiceHeader.getDestinationAddress()).isEqualTo(DEFAULT_DESTINATION_ADDRESS);
        assertThat(testInvoiceHeader.getDestinationStreetId()).isEqualTo(DEFAULT_DESTINATION_STREET_ID);
        assertThat(testInvoiceHeader.getReceiverName()).isEqualTo(DEFAULT_RECEIVER_NAME);
        assertThat(testInvoiceHeader.getReceiverPhone()).isEqualTo(DEFAULT_RECEIVER_PHONE);
        assertThat(testInvoiceHeader.getSubTotal()).isEqualTo(DEFAULT_SUB_TOTAL);
        assertThat(testInvoiceHeader.getTaxAmount()).isEqualTo(DEFAULT_TAX_AMOUNT);
        assertThat(testInvoiceHeader.getTotalDue()).isEqualTo(DEFAULT_TOTAL_DUE);
        assertThat(testInvoiceHeader.getNote()).isEqualTo(DEFAULT_NOTE);
        assertThat(testInvoiceHeader.isCancel()).isEqualTo(DEFAULT_CANCEL);
        assertThat(testInvoiceHeader.getCancelReason()).isEqualTo(DEFAULT_CANCEL_REASON);
        assertThat(testInvoiceHeader.isCustomerConfirm()).isEqualTo(DEFAULT_CUSTOMER_CONFIRM);
        assertThat(testInvoiceHeader.getChangeNote()).isEqualTo(DEFAULT_CHANGE_NOTE);
        assertThat(testInvoiceHeader.isFinish()).isEqualTo(DEFAULT_FINISH);
        assertThat(testInvoiceHeader.getReviewDate()).isEqualTo(DEFAULT_RECEIVE_DATE);
        assertThat(testInvoiceHeader.getDueDate()).isEqualTo(DEFAULT_DUE_DATE);
        assertThat(testInvoiceHeader.getFinishDate()).isEqualTo(DEFAULT_FINISH_DATE);
        assertThat(testInvoiceHeader.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testInvoiceHeader.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createInvoiceHeaderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = invoiceHeaderRepository.findAll().size();

        // Create the InvoiceHeader with an existing ID
        invoiceHeader.setId(1L);
        InvoiceHeaderDTO invoiceHeaderDTO = invoiceHeaderMapper.toDto(invoiceHeader);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInvoiceHeaderMockMvc.perform(post("/api/invoice-headers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoiceHeaderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the InvoiceHeader in the database
        List<InvoiceHeader> invoiceHeaderList = invoiceHeaderRepository.findAll();
        assertThat(invoiceHeaderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInvoiceHeaders() throws Exception {
        // Initialize the database
        invoiceHeaderRepository.saveAndFlush(invoiceHeader);

        // Get all the invoiceHeaderList
        restInvoiceHeaderMockMvc.perform(get("/api/invoice-headers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(invoiceHeader.getId().intValue())))
            .andExpect(jsonPath("$.[*].customerId").value(hasItem(DEFAULT_CUSTOMER_ID.intValue())))
            .andExpect(jsonPath("$.[*].officeId").value(hasItem(DEFAULT_OFFICE_ID.intValue())))
            .andExpect(jsonPath("$.[*].invoiceNo").value(hasItem(DEFAULT_INVOICE_NO.toString())))
            .andExpect(jsonPath("$.[*].invoiceType").value(hasItem(DEFAULT_INVOICE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].startAddress").value(hasItem(DEFAULT_START_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].startStreetId").value(hasItem(DEFAULT_START_STREET_ID.intValue())))
            .andExpect(jsonPath("$.[*].destinationAddress").value(hasItem(DEFAULT_DESTINATION_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].destinationStreetId").value(hasItem(DEFAULT_DESTINATION_STREET_ID.intValue())))
            .andExpect(jsonPath("$.[*].receiverName").value(hasItem(DEFAULT_RECEIVER_NAME.toString())))
            .andExpect(jsonPath("$.[*].receiverPhone").value(hasItem(DEFAULT_RECEIVER_PHONE.toString())))
            .andExpect(jsonPath("$.[*].subTotal").value(hasItem(DEFAULT_SUB_TOTAL.intValue())))
            .andExpect(jsonPath("$.[*].taxAmount").value(hasItem(DEFAULT_TAX_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].totalDue").value(hasItem(DEFAULT_TOTAL_DUE.intValue())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE.toString())))
            .andExpect(jsonPath("$.[*].cancel").value(hasItem(DEFAULT_CANCEL.booleanValue())))
            .andExpect(jsonPath("$.[*].cancelReason").value(hasItem(DEFAULT_CANCEL_REASON.toString())))
            .andExpect(jsonPath("$.[*].customerConfirm").value(hasItem(DEFAULT_CUSTOMER_CONFIRM.booleanValue())))
            .andExpect(jsonPath("$.[*].changeNote").value(hasItem(DEFAULT_CHANGE_NOTE.toString())))
            .andExpect(jsonPath("$.[*].finish").value(hasItem(DEFAULT_FINISH.booleanValue())))
            .andExpect(jsonPath("$.[*].receiveDate").value(hasItem(DEFAULT_RECEIVE_DATE.toString())))
            .andExpect(jsonPath("$.[*].dueDate").value(hasItem(DEFAULT_DUE_DATE.toString())))
            .andExpect(jsonPath("$.[*].finishDate").value(hasItem(DEFAULT_FINISH_DATE.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getInvoiceHeader() throws Exception {
        // Initialize the database
        invoiceHeaderRepository.saveAndFlush(invoiceHeader);

        // Get the invoiceHeader
        restInvoiceHeaderMockMvc.perform(get("/api/invoice-headers/{id}", invoiceHeader.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(invoiceHeader.getId().intValue()))
            .andExpect(jsonPath("$.customerId").value(DEFAULT_CUSTOMER_ID.intValue()))
            .andExpect(jsonPath("$.officeId").value(DEFAULT_OFFICE_ID.intValue()))
            .andExpect(jsonPath("$.invoiceNo").value(DEFAULT_INVOICE_NO.toString()))
            .andExpect(jsonPath("$.invoiceType").value(DEFAULT_INVOICE_TYPE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.startAddress").value(DEFAULT_START_ADDRESS.toString()))
            .andExpect(jsonPath("$.startStreetId").value(DEFAULT_START_STREET_ID.intValue()))
            .andExpect(jsonPath("$.destinationAddress").value(DEFAULT_DESTINATION_ADDRESS.toString()))
            .andExpect(jsonPath("$.destinationStreetId").value(DEFAULT_DESTINATION_STREET_ID.intValue()))
            .andExpect(jsonPath("$.receiverName").value(DEFAULT_RECEIVER_NAME.toString()))
            .andExpect(jsonPath("$.receiverPhone").value(DEFAULT_RECEIVER_PHONE.toString()))
            .andExpect(jsonPath("$.subTotal").value(DEFAULT_SUB_TOTAL.intValue()))
            .andExpect(jsonPath("$.taxAmount").value(DEFAULT_TAX_AMOUNT.intValue()))
            .andExpect(jsonPath("$.totalDue").value(DEFAULT_TOTAL_DUE.intValue()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE.toString()))
            .andExpect(jsonPath("$.cancel").value(DEFAULT_CANCEL.booleanValue()))
            .andExpect(jsonPath("$.cancelReason").value(DEFAULT_CANCEL_REASON.toString()))
            .andExpect(jsonPath("$.customerConfirm").value(DEFAULT_CUSTOMER_CONFIRM.booleanValue()))
            .andExpect(jsonPath("$.changeNote").value(DEFAULT_CHANGE_NOTE.toString()))
            .andExpect(jsonPath("$.finish").value(DEFAULT_FINISH.booleanValue()))
            .andExpect(jsonPath("$.receiveDate").value(DEFAULT_RECEIVE_DATE.toString()))
            .andExpect(jsonPath("$.dueDate").value(DEFAULT_DUE_DATE.toString()))
            .andExpect(jsonPath("$.finishDate").value(DEFAULT_FINISH_DATE.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInvoiceHeader() throws Exception {
        // Get the invoiceHeader
        restInvoiceHeaderMockMvc.perform(get("/api/invoice-headers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInvoiceHeader() throws Exception {
        // Initialize the database
        invoiceHeaderRepository.saveAndFlush(invoiceHeader);

        int databaseSizeBeforeUpdate = invoiceHeaderRepository.findAll().size();

        // Update the invoiceHeader
        InvoiceHeader updatedInvoiceHeader = invoiceHeaderRepository.findById(invoiceHeader.getId()).get();
        // Disconnect from session so that the updates on updatedInvoiceHeader are not directly saved in db
        em.detach(updatedInvoiceHeader);
        updatedInvoiceHeader
            .customerId(UPDATED_CUSTOMER_ID)
            .officeId(UPDATED_OFFICE_ID)
            .invoiceNo(UPDATED_INVOICE_NO)
            .invoiceType(UPDATED_INVOICE_TYPE)
            .status(UPDATED_STATUS)
            .startAddress(UPDATED_START_ADDRESS)
            .startStreetId(UPDATED_START_STREET_ID)
            .destinationAddress(UPDATED_DESTINATION_ADDRESS)
            .destinationStreetId(UPDATED_DESTINATION_STREET_ID)
            .receiverName(UPDATED_RECEIVER_NAME)
            .receiverPhone(UPDATED_RECEIVER_PHONE)
            .subTotal(UPDATED_SUB_TOTAL)
            .taxAmount(UPDATED_TAX_AMOUNT)
            .totalDue(UPDATED_TOTAL_DUE)
            .note(UPDATED_NOTE)
            .cancel(UPDATED_CANCEL)
            .cancelReason(UPDATED_CANCEL_REASON)
            .customerConfirm(UPDATED_CUSTOMER_CONFIRM)
            .changeNote(UPDATED_CHANGE_NOTE)
            .finish(UPDATED_FINISH)
            .reviewDate(UPDATED_RECEIVE_DATE)
            .dueDate(UPDATED_DUE_DATE)
            .finishDate(UPDATED_FINISH_DATE)
            .createDate(UPDATED_CREATE_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        InvoiceHeaderDTO invoiceHeaderDTO = invoiceHeaderMapper.toDto(updatedInvoiceHeader);

        restInvoiceHeaderMockMvc.perform(put("/api/invoice-headers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoiceHeaderDTO)))
            .andExpect(status().isOk());

        // Validate the InvoiceHeader in the database
        List<InvoiceHeader> invoiceHeaderList = invoiceHeaderRepository.findAll();
        assertThat(invoiceHeaderList).hasSize(databaseSizeBeforeUpdate);
        InvoiceHeader testInvoiceHeader = invoiceHeaderList.get(invoiceHeaderList.size() - 1);
        assertThat(testInvoiceHeader.getCustomerId()).isEqualTo(UPDATED_CUSTOMER_ID);
        assertThat(testInvoiceHeader.getOfficeId()).isEqualTo(UPDATED_OFFICE_ID);
        assertThat(testInvoiceHeader.getInvoiceNo()).isEqualTo(UPDATED_INVOICE_NO);
        assertThat(testInvoiceHeader.getInvoiceType()).isEqualTo(UPDATED_INVOICE_TYPE);
        assertThat(testInvoiceHeader.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testInvoiceHeader.getStartAddress()).isEqualTo(UPDATED_START_ADDRESS);
        assertThat(testInvoiceHeader.getStartStreetId()).isEqualTo(UPDATED_START_STREET_ID);
        assertThat(testInvoiceHeader.getDestinationAddress()).isEqualTo(UPDATED_DESTINATION_ADDRESS);
        assertThat(testInvoiceHeader.getDestinationStreetId()).isEqualTo(UPDATED_DESTINATION_STREET_ID);
        assertThat(testInvoiceHeader.getReceiverName()).isEqualTo(UPDATED_RECEIVER_NAME);
        assertThat(testInvoiceHeader.getReceiverPhone()).isEqualTo(UPDATED_RECEIVER_PHONE);
        assertThat(testInvoiceHeader.getSubTotal()).isEqualTo(UPDATED_SUB_TOTAL);
        assertThat(testInvoiceHeader.getTaxAmount()).isEqualTo(UPDATED_TAX_AMOUNT);
        assertThat(testInvoiceHeader.getTotalDue()).isEqualTo(UPDATED_TOTAL_DUE);
        assertThat(testInvoiceHeader.getNote()).isEqualTo(UPDATED_NOTE);
        assertThat(testInvoiceHeader.isCancel()).isEqualTo(UPDATED_CANCEL);
        assertThat(testInvoiceHeader.getCancelReason()).isEqualTo(UPDATED_CANCEL_REASON);
        assertThat(testInvoiceHeader.isCustomerConfirm()).isEqualTo(UPDATED_CUSTOMER_CONFIRM);
        assertThat(testInvoiceHeader.getChangeNote()).isEqualTo(UPDATED_CHANGE_NOTE);
        assertThat(testInvoiceHeader.isFinish()).isEqualTo(UPDATED_FINISH);
        assertThat(testInvoiceHeader.getReviewDate()).isEqualTo(UPDATED_RECEIVE_DATE);
        assertThat(testInvoiceHeader.getDueDate()).isEqualTo(UPDATED_DUE_DATE);
        assertThat(testInvoiceHeader.getFinishDate()).isEqualTo(UPDATED_FINISH_DATE);
        assertThat(testInvoiceHeader.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testInvoiceHeader.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingInvoiceHeader() throws Exception {
        int databaseSizeBeforeUpdate = invoiceHeaderRepository.findAll().size();

        // Create the InvoiceHeader
        InvoiceHeaderDTO invoiceHeaderDTO = invoiceHeaderMapper.toDto(invoiceHeader);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInvoiceHeaderMockMvc.perform(put("/api/invoice-headers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoiceHeaderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the InvoiceHeader in the database
        List<InvoiceHeader> invoiceHeaderList = invoiceHeaderRepository.findAll();
        assertThat(invoiceHeaderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInvoiceHeader() throws Exception {
        // Initialize the database
        invoiceHeaderRepository.saveAndFlush(invoiceHeader);

        int databaseSizeBeforeDelete = invoiceHeaderRepository.findAll().size();

        // Get the invoiceHeader
        restInvoiceHeaderMockMvc.perform(delete("/api/invoice-headers/{id}", invoiceHeader.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<InvoiceHeader> invoiceHeaderList = invoiceHeaderRepository.findAll();
        assertThat(invoiceHeaderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InvoiceHeader.class);
        InvoiceHeader invoiceHeader1 = new InvoiceHeader();
        invoiceHeader1.setId(1L);
        InvoiceHeader invoiceHeader2 = new InvoiceHeader();
        invoiceHeader2.setId(invoiceHeader1.getId());
        assertThat(invoiceHeader1).isEqualTo(invoiceHeader2);
        invoiceHeader2.setId(2L);
        assertThat(invoiceHeader1).isNotEqualTo(invoiceHeader2);
        invoiceHeader1.setId(null);
        assertThat(invoiceHeader1).isNotEqualTo(invoiceHeader2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(InvoiceHeaderDTO.class);
        InvoiceHeaderDTO invoiceHeaderDTO1 = new InvoiceHeaderDTO();
        invoiceHeaderDTO1.setId(1L);
        InvoiceHeaderDTO invoiceHeaderDTO2 = new InvoiceHeaderDTO();
        assertThat(invoiceHeaderDTO1).isNotEqualTo(invoiceHeaderDTO2);
        invoiceHeaderDTO2.setId(invoiceHeaderDTO1.getId());
        assertThat(invoiceHeaderDTO1).isEqualTo(invoiceHeaderDTO2);
        invoiceHeaderDTO2.setId(2L);
        assertThat(invoiceHeaderDTO1).isNotEqualTo(invoiceHeaderDTO2);
        invoiceHeaderDTO1.setId(null);
        assertThat(invoiceHeaderDTO1).isNotEqualTo(invoiceHeaderDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(invoiceHeaderMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(invoiceHeaderMapper.fromId(null)).isNull();
    }
}
