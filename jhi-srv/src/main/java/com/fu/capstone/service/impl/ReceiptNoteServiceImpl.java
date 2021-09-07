package com.fu.capstone.service.impl;

import com.fu.capstone.domain.*;
import com.fu.capstone.repository.*;
import com.fu.capstone.service.ReceiptNoteService;
import com.fu.capstone.service.dto.ReceiptInvoiceDTO;
import com.fu.capstone.service.dto.InvoiceDetailsDTO;
import com.fu.capstone.service.dto.PackageDetailsDTO;
import com.fu.capstone.service.dto.ReceiptDetailPackageDTO;
import com.fu.capstone.service.dto.ReceiptNoteDTO;
import com.fu.capstone.service.mapper.InvoiceDetailsMapper;
import com.fu.capstone.service.mapper.InvoiceHeaderMapper;
import com.fu.capstone.service.mapper.InvoicePackageMapper;
import com.fu.capstone.service.mapper.ReceiptNoteMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing ReceiptNote.
 */
@Service
@Transactional
public class ReceiptNoteServiceImpl implements ReceiptNoteService {

    private final Logger log = LoggerFactory.getLogger(ReceiptNoteServiceImpl.class);

    private ReceiptNoteRepository receiptNoteRepository;

    private ReceiptNoteMapper receiptNoteMapper;

    private InvoiceHeaderRepository invoiceHeaderRepository;

    private InvoiceHeaderMapper invoiceHeaderMapper;

    private InvoicePackageRepository invoicePackageRepository;

    private InvoicePackageMapper invoicePackageMapper;

    private InvoiceDetailsRepository invoiceDetailsRepository;

    private InvoiceDetailsMapper invoiceDetailsMapper;

    private PersonalShipmentRepository personalShipmentRepository;

    private PaymentRepository paymentRepository;

    private PriceRepository priceRepository;

    public ReceiptNoteServiceImpl(ReceiptNoteRepository receiptNoteRepository, ReceiptNoteMapper receiptNoteMapper,
                                  InvoiceHeaderRepository invoiceHeaderRepository, InvoiceHeaderMapper invoiceHeaderMapper,
                                  InvoicePackageRepository invoicePackageRepository, InvoicePackageMapper invoicePackageMapper,
                                  InvoiceDetailsRepository invoiceDetailsRepository, InvoiceDetailsMapper invoiceDetailsMapper,
                                  PersonalShipmentRepository personalShipmentRepository,
                                  PaymentRepository paymentRepository, PriceRepository priceRepository) {
        this.receiptNoteRepository = receiptNoteRepository;
        this.receiptNoteMapper = receiptNoteMapper;
        this.invoiceHeaderRepository = invoiceHeaderRepository;
        this.invoiceHeaderMapper = invoiceHeaderMapper;
        this.invoicePackageRepository = invoicePackageRepository;
        this.invoicePackageMapper = invoicePackageMapper;
        this.invoiceDetailsRepository = invoiceDetailsRepository;
        this.invoiceDetailsMapper = invoiceDetailsMapper;
        this.personalShipmentRepository = personalShipmentRepository;
        this.paymentRepository = paymentRepository;
        this.priceRepository = priceRepository;
    }

    /**
     * Save a receiptNote.
     *
     * @param receiptNoteDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ReceiptNoteDTO save(ReceiptNoteDTO receiptNoteDTO) {
        log.debug("Request to save ReceiptNote : {}", receiptNoteDTO);

        ReceiptNote receiptNote = receiptNoteMapper.toEntity(receiptNoteDTO);
        Instant instant = Instant.now();
        if (receiptNote.getId() == null) {
            receiptNote.setCreateDate(instant);
        }
        receiptNote.setUpdateDate(instant);
        receiptNote = receiptNoteRepository.save(receiptNote);
        InvoiceHeader inv = invoiceHeaderRepository.getOne(receiptNote.getInvoiceHeaderId());
        PersonalShipment ps = personalShipmentRepository.getCollectShipmentByInvoice(receiptNote.getInvoiceHeaderId());
        ps.setFinishTime(instant);
        inv.setUpdateDate(instant);
        ps.setUpdateDate(instant);
        inv.setStatus("collected");
        ps.setStatus("finish");
        invoiceHeaderRepository.save(inv);
        personalShipmentRepository.save(ps);
        return receiptNoteMapper.toDto(receiptNote);
    }

    /**
     * Get all the receiptNotes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ReceiptNoteDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ReceiptNotes");
        return receiptNoteRepository.findAll(pageable).map(receiptNoteMapper::toDto);
    }

    /**
     * Get one receiptNote by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ReceiptNoteDTO> findOne(Long id) {
        log.debug("Request to get ReceiptNote : {}", id);
        return receiptNoteRepository.findById(id).map(receiptNoteMapper::toDto);
    }

    /**
     * Delete the receiptNote by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ReceiptNote : {}", id);
        receiptNoteRepository.deleteById(id);
    }

    @Override
    public ReceiptNoteDTO getReceiptNoteByShipmentId(Long id) {
        return receiptNoteMapper.toDto(receiptNoteRepository.getReceiptNoteByShipmentId(id));
    }

    @Override
    public List<ReceiptInvoiceDTO> getAllReceiptInvoiceByUser(Long id, Pageable pageable) {
        List<ReceiptInvoiceDTO> list = new ArrayList<>();
        List<ReceiptNote> noteList = receiptNoteRepository.getAllReceiptNotConfirm(id, pageable);
        for (ReceiptNote r : noteList) {
            ReceiptInvoiceDTO riDto = new ReceiptInvoiceDTO();
            InvoiceHeader inv = invoiceHeaderRepository.getOne(r.getInvoiceHeaderId());
            riDto.setReceiptNote(receiptNoteMapper.toDto(r));
            riDto.setInvoiceHeader(invoiceHeaderMapper.toDto(inv));
            list.add(riDto);
        }
        return list;
    }

    @Override
    public List<PackageDetailsDTO> getReceiptItemPackage(Long id) {
        List<InvoicePackage> pgkList = invoicePackageRepository.getInvoicePackageByHeaderId(id);
        List<InvoiceDetails> idtList = invoiceDetailsRepository.getInvoiceDetailsByHeaderId(id);
        List<PackageDetailsDTO> rs = new ArrayList<>();
        for (InvoicePackage ip : pgkList) {
            PackageDetailsDTO dto = new PackageDetailsDTO();
            dto.setInvPackage(invoicePackageMapper.toDto(ip));
            dto.setItemList(new ArrayList<>());
            for (InvoiceDetails ids : idtList) {
                if (ids.getInvoicePackageId().longValue() == ip.getId().longValue()) {
                    dto.getItemList().add(invoiceDetailsMapper.toDto(ids));
                }
            }
            rs.add(dto);
        }
        return rs;
    }

    @Override
    public ReceiptNoteDTO createReceiptNoteColectShipment(ReceiptDetailPackageDTO data) {
        Instant instant = Instant.now();
        InvoiceHeader inv = invoiceHeaderRepository.getOne(data.getReceipt().getInvoiceHeaderId());
        if (data.getReceipt().getId() == null)
            data.getReceipt().setCreateDate(instant);
        data.getReceipt().setUpdateDate(instant);

        // collect receipt and process
        List<InvoiceDetails> detailsList = new ArrayList<>();
        for (PackageDetailsDTO pd : data.getPackageList()) {
            pd.getInvPackage().setInvoiceHeaderId(inv.getId());
            pd.getInvPackage().setUpdateDate(instant);
            pd.getInvPackage().setStatus("received");
            InvoicePackage ip = invoicePackageRepository.save(invoicePackageMapper.toEntity(pd.getInvPackage()));
            for (InvoiceDetailsDTO id : pd.getItemList()) {
                if (id.getItemName() != null && id.getItemType() != null) {
                    if (id.getId() == null)
                        id.setCreateDate(instant);
                    id.setUpdateDate(instant);
                    id.setInvoicePackageId(ip.getId());
                    id.setInvoiceHeaderId(inv.getId());
                    detailsList.add(invoiceDetailsMapper.toEntity(id));
                }
            }
        }
        invoiceDetailsRepository.saveAll(detailsList);

        inv.setUpdateDate(instant);
        BigDecimal subTotal = calculateSubTotal(data.getPackageList());
        inv.setSubTotal(subTotal);
        inv.setTaxAmount(subTotal.multiply(new BigDecimal("0.1")));
        inv.setTotalDue(subTotal.multiply(new BigDecimal("1.1")));
        inv.setStatus("collected");

        PersonalShipment ps = personalShipmentRepository
            .getCollectShipmentByInvoice(data.getReceipt().getInvoiceHeaderId());
        ps.setStatus("done");
        ps.setShipTime(instant);
        ps.setFinishTime(instant);
        ps.setUpdateDate(instant);

        // save data
        ReceiptNote rn = receiptNoteRepository.save(receiptNoteMapper.toEntity(data.getReceipt()));
        rn.setReceiptType(true);
        rn.setCreateDate(instant);
        rn.setUpdateDate(instant);

        if (data.getPay()) {
            Payment pm = new Payment();
            pm.setInvoiceHeaderId(inv.getId());
            pm.setEmployeeId(data.getReceipt().getEmployeeId());
            pm.setSenderPay(!inv.getReceiverPay());
            pm.setCreateDate(instant);
            pm.setUpdateDate(instant);
            pm.setAmountPaid(inv.getTotalDue());
            pm.setAmountDue(inv.getTotalDue().subtract(pm.getAmountPaid()));
            pm.setReceiptNoteId(rn.getId());
            paymentRepository.save(pm);
        }

        invoiceHeaderRepository.save(inv);
        personalShipmentRepository.save(ps);
        return receiptNoteMapper.toDto(rn);
    }

    private BigDecimal calculateSubTotal(List<PackageDetailsDTO> lstPackage) {
        BigDecimal result = null;
        float totalWeight = 0;
        for (PackageDetailsDTO ip : lstPackage) {
            totalWeight += ip.getInvPackage().getWeight();
        }
        List<Price> priceList = priceRepository.findAll(new Sort(Sort.Direction.ASC, "weight"));
        totalWeight /= 1000;

        for (Price p : priceList) {
            if (totalWeight <= p.getWeight()) {
                if (p.isMultiply()) result = BigDecimal.valueOf(p.getDefaultPrice())
                    .add(BigDecimal.valueOf(p.getPrice()).multiply(BigDecimal.valueOf(totalWeight)));
                else result = BigDecimal.valueOf(p.getPrice());
                break;
            }
        }

        return result;
    }

    @Override
    public ReceiptNoteDTO createReceiptNoteDeliveryShipment(ReceiptDetailPackageDTO data) {
        Instant instant = Instant.now();
        InvoiceHeader inv = invoiceHeaderRepository.getOne(data.getReceipt().getInvoiceHeaderId());
        List<InvoicePackage> ipList = invoicePackageRepository.getInvoicePackageByHeaderId(inv.getId());
        PersonalShipment ps = personalShipmentRepository
            .getDeliveryShipmentByInvoice(data.getReceipt().getInvoiceHeaderId());

        // delivery receipt and process
        for (PackageDetailsDTO pd : data.getPackageList()) {
            pd.getInvPackage().setUpdateDate(instant);
            pd.getInvPackage().setStatus("finish");
            pd.getInvPackage().setInvoiceHeaderId(data.getReceipt().getInvoiceHeaderId());
        }

        // invoice process
        inv.setStatus("finish");
        inv.setFinishDate(instant);
        ps.setStatus("finish");
        ps.setShipTime(instant);
        ps.setFinishTime(instant);
        ps.setUpdateDate(instant);

        // package process
        for (InvoicePackage ip : ipList) {
            ip.setWarehouseId(null);
        }

        // save data
        ReceiptNote rn = receiptNoteRepository.save(receiptNoteMapper.toEntity(data.getReceipt()));
        rn.setReceiptType(false);
        rn.setCreateDate(instant);
        rn.setUpdateDate(instant);

        if (data.getPay()) {
            Payment pm = new Payment();
            pm.setInvoiceHeaderId(inv.getId());
            pm.setEmployeeId(data.getReceipt().getEmployeeId());
            pm.setSenderPay(!inv.getReceiverPay());
            pm.setCreateDate(instant);
            pm.setUpdateDate(instant);
            pm.setAmountPaid(new BigDecimal(data.getPayAmount()));
            pm.setAmountDue(inv.getTotalDue().subtract(pm.getAmountPaid()));
            pm.setReceiptNoteId(rn.getId());
            paymentRepository.save(pm);
        }

        invoiceHeaderRepository.save(inv);
        invoicePackageRepository.saveAll(ipList);
        personalShipmentRepository.save(ps);
        return receiptNoteMapper.toDto(receiptNoteRepository.save(rn));
    }

    @Override
    public ReceiptNoteDTO createReceiptByOfficer(ReceiptDetailPackageDTO data) {
        Instant instant = Instant.now();
        InvoiceHeader inv = invoiceHeaderRepository.getOne(data.getReceipt().getInvoiceHeaderId());
        inv.setStatus("received");

        // delivery receipt and process
        List<InvoiceDetails> detailsList = new ArrayList<>();
        for (PackageDetailsDTO pd : data.getPackageList()) {
            pd.getInvPackage().setInvoiceHeaderId(inv.getId());
            pd.getInvPackage().setUpdateDate(instant);
            pd.getInvPackage().setStatus("received");
            InvoicePackage ip = invoicePackageRepository.save(invoicePackageMapper.toEntity(pd.getInvPackage()));
            for (InvoiceDetailsDTO id : pd.getItemList()) {
                if (id.getItemName() != null && id.getItemType() != null) {
                    if (id.getId() == null)
                        id.setCreateDate(instant);
                    id.setUpdateDate(instant);
                    id.setInvoicePackageId(ip.getId());
                    id.setInvoiceHeaderId(inv.getId());
                    detailsList.add(invoiceDetailsMapper.toEntity(id));
                }
            }
        }
        invoiceDetailsRepository.saveAll(detailsList);

        inv.setUpdateDate(instant);
        BigDecimal subTotal = calculateSubTotal(data.getPackageList());
        inv.setSubTotal(subTotal);
        inv.setTaxAmount(subTotal.multiply(new BigDecimal("0.1")));
        inv.setTotalDue(subTotal.multiply(new BigDecimal("1.1")));

        // save data
        ReceiptNote rn = receiptNoteRepository.save(receiptNoteMapper.toEntity(data.getReceipt()));
        rn.setReceiptType(true);
        rn.setCreateDate(instant);
        rn.setUpdateDate(instant);

        if (data.getPay()) {
            Payment pm = new Payment();
            pm.setInvoiceHeaderId(inv.getId());
            pm.setEmployeeId(data.getReceipt().getEmployeeId());
            pm.setOfficerId(data.getReceipt().getEmployeeId());
            pm.setSenderPay(!inv.getReceiverPay());
            pm.setCreateDate(instant);
            pm.setUpdateDate(instant);
            pm.setAmountPaid(new BigDecimal(data.getPayAmount()));
            pm.setAmountDue(inv.getTotalDue().subtract(pm.getAmountPaid()));
            pm.setReceiptNoteId(rn.getId());
            paymentRepository.save(pm);
        }

        invoiceHeaderRepository.save(inv);
        return receiptNoteMapper.toDto(rn);
    }

    @Override
    public ReceiptNoteDTO getReceiveNoteByInvoiceId(Long id) {
        return receiptNoteMapper.toDto(receiptNoteRepository.getReceiptNoteByHeaderId(id).get());
    }
}
