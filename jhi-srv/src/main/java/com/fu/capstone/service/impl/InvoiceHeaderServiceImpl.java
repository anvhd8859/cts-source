package com.fu.capstone.service.impl;

import com.fu.capstone.domain.*;
import com.fu.capstone.repository.*;
import com.fu.capstone.service.InvoiceHeaderService;
import com.fu.capstone.service.dto.*;
import com.fu.capstone.service.mapper.InvoiceDetailsMapper;
import com.fu.capstone.service.mapper.InvoiceHeaderMapper;
import com.fu.capstone.service.mapper.InvoicePackageMapper;
import com.fu.capstone.service.mapper.PersonalShipmentMapper;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;

import org.joda.time.LocalDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing InvoiceHeader.
 */
@Service
@Transactional
public class InvoiceHeaderServiceImpl implements InvoiceHeaderService {

    private final Logger log = LoggerFactory.getLogger(InvoiceHeaderServiceImpl.class);

    private InvoiceHeaderRepository invoiceHeaderRepository;

    private InvoiceDetailsRepository invoiceDetailsRepository;

    private InvoicePackageRepository invoicePackageRepository;

    private PersonalShipmentRepository personalShipmentRepository;

    private StreetRepository streetRepository;

    private OfficeRepository officeRepository;

    private WorkingAreaRepository workingAreaRepository;

    private InvoiceHeaderMapper invoiceHeaderMapper;

    private InvoiceDetailsMapper invoiceDetailsMapper;

    private InvoicePackageMapper invoicePackageMapper;

    private PersonalShipmentMapper personalShipmentMapper;

    private PriceRepository priceRepository;

    public InvoiceHeaderServiceImpl(
        InvoiceHeaderRepository invoiceHeaderRepository,
        InvoiceHeaderMapper invoiceHeaderMapper, InvoiceDetailsRepository invoiceDetailsRepository,
        InvoiceDetailsMapper invoiceDetailsMapper, InvoicePackageRepository invoicePackageRepository,
        InvoicePackageMapper invoicePackageMapper, PersonalShipmentRepository personalShipmentRepository,
        PersonalShipmentMapper personalShipmentMapper, StreetRepository streetRepository,
        OfficeRepository officeRepository, WorkingAreaRepository workingAreaRepository,
        PriceRepository priceRepository) {
        this.invoiceHeaderRepository = invoiceHeaderRepository;
        this.invoiceHeaderMapper = invoiceHeaderMapper;
        this.invoiceDetailsRepository = invoiceDetailsRepository;
        this.invoiceDetailsMapper = invoiceDetailsMapper;
        this.invoicePackageRepository = invoicePackageRepository;
        this.invoicePackageMapper = invoicePackageMapper;
        this.personalShipmentRepository = personalShipmentRepository;
        this.personalShipmentMapper = personalShipmentMapper;
        this.streetRepository = streetRepository;
        this.officeRepository = officeRepository;
        this.workingAreaRepository = workingAreaRepository;
        this.priceRepository = priceRepository;
    }

    /**
     * Save a invoiceHeader.
     *
     * @param invoiceHeaderDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public InvoiceHeaderDTO save(InvoiceHeaderDTO invoiceHeaderDTO) {
        log.debug("Request to save InvoiceHeader : {}", invoiceHeaderDTO);
        InvoiceHeader invoiceHeader = invoiceHeaderMapper.toEntity(invoiceHeaderDTO);
        Instant instant = Instant.now();
        if (invoiceHeader.getId() == null) {
            invoiceHeader.setCreateDate(instant);
            invoiceHeader.setDueDate(instant.plus(3, ChronoUnit.DAYS));
        } else {
            invoiceHeader.setDueDate(invoiceHeader.getCreateDate().plus(3, ChronoUnit.DAYS));
        }
        invoiceHeader.setUpdateDate(instant);
        invoiceHeader = invoiceHeaderRepository.save(invoiceHeader);
        return invoiceHeaderMapper.toDto(invoiceHeader);
    }

    /**
     * Get all the invoiceHeaders.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<InvoiceHeaderDTO> findAll(Pageable pageable) {
        log.debug("Request to get all InvoiceHeaders");
        return invoiceHeaderRepository.findAll(pageable).map(invoiceHeaderMapper::toDto);
    }

    /**
     * Get one invoiceHeader by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<InvoiceHeaderDTO> findOne(Long id) {
        log.debug("Request to get InvoiceHeader : {}", id);
        return invoiceHeaderRepository.findById(id).map(invoiceHeaderMapper::toDto);
    }

    /**
     * Delete the invoiceHeader by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete InvoiceHeader : {}", id);
        invoiceHeaderRepository.deleteById(id);
    }

    // AnhVD new code
    @Override
    public Page<InvoiceHeaderDTO> getInvoiceHeadersByParams(String invoiceNo, String status, String receiveDate,
                                                            String createDate, String updateDate, Pageable pageable) {
        return invoiceHeaderRepository
            .getInvoiceHeadersByParams(invoiceNo, status, receiveDate, createDate, updateDate, pageable)
            .map(invoiceHeaderMapper::toDto);
    }

    // DongPh code
    @Override
    public InvoiceHeaderDTO createNewInvoice(InvoiceHeaderDTO invoiceHeaderDTO) {
        InvoiceHeader invoiceHeader = invoiceHeaderMapper.toEntity(invoiceHeaderDTO);
        invoiceHeader = invoiceHeaderRepository.save(invoiceHeader);
        // process invoice header no
        String invNo = "INV" + LocalDate.now().getYear() + "-" + String.format("%010d", invoiceHeader.getId());
        invoiceHeader.setInvoiceNo(invNo);
        // process invoice header no
        invoiceHeader = invoiceHeaderRepository.save(invoiceHeader);
        return invoiceHeaderMapper.toDto(invoiceHeader);
    }

    // start function
    @Override
    public Page<InvoiceShipmentDTO> getInvoiceHeadersByShipper(Long id, String invNo, String type, Pageable pageable) {
        Page<InvoiceHeaderDTO> invoicePage = invoiceHeaderRepository
            .getInvoiceHeadersByShipper(id, invNo, type, pageable).map(invoiceHeaderMapper::toDto);
        return invoicePage.map(this::convert);
    }

    // convert
    private InvoiceShipmentDTO convert(InvoiceHeaderDTO value) {
        InvoiceShipmentDTO isDTO = new InvoiceShipmentDTO();
        List<PersonalShipmentDTO> psDTO = personalShipmentMapper
            .toDto(personalShipmentRepository.getShipmentByInvoice(value.getId()));
        isDTO.setInvoiceHeader(value);
        isDTO.setPersonalShipmentList(psDTO);
        return isDTO;
    }
    // end function

    @Override
    public Page<InvoiceHeaderDTO> getInvoiceHeadersRequestCancel(Pageable pageable) {
        return invoiceHeaderRepository.getInvoiceHeadersRequestCancel(pageable).map(invoiceHeaderMapper::toDto);
    }

    @Override
    public InvoiceHeaderDTO createInvoiceHeaderDetailPackage(InvoicePackageDetailDTO invoicePackageDetailDTO,
                                                             int check) {
        // get data from web
        InvoiceHeaderDTO invoiceHeaderDTO = invoicePackageDetailDTO.getInvoice();
        List<PackageDetailsDTO> lstPackageDetails = invoicePackageDetailDTO.getPackageList();
        List<InvoiceDetailsDTO> lstDetailDTO = new ArrayList<>();
        Street fromStreet = streetRepository.getFullAddressByStreetId(invoiceHeaderDTO.getStartStreetId());
        Street toStreet = streetRepository.getFullAddressByStreetId(invoiceHeaderDTO.getDestinationStreetId());

        // get destination office id
        if (invoiceHeaderDTO.getId() == null) {
            Office ofc = officeRepository.searchOfficeNearby(toStreet.getId(), toStreet.getSubDistrictId().getId(),
                toStreet.getSubDistrictId().getDistrictId().getId());
            if (ofc != null) invoiceHeaderDTO.setDestinationOfficeId(ofc.getId());
            invoiceHeaderDTO.setStatus("waiting");
        }

        // create invoice and get invoice with ID
        invoiceHeaderDTO = this.save(invoiceHeaderDTO);
        List<PersonalShipment> lstShipment = new ArrayList<>();

        // set invoice id for package and detail
        Instant instant = Instant.now();
        for (PackageDetailsDTO i : lstPackageDetails) {
            InvoicePackageDTO ip = i.getInvPackage();
            ip.setInvoiceHeaderId(invoiceHeaderDTO.getId());
            if (ip.getId() == null) {
                ip.setCreateDate(instant);
            }
            ip.setUpdateDate(instant);
            ip = invoicePackageMapper.toDto(invoicePackageRepository.save(invoicePackageMapper.toEntity(ip)));
            for (InvoiceDetailsDTO id : i.getItemList()) {
                id.setInvoiceHeaderId(invoiceHeaderDTO.getId());
                id.setInvoicePackageId(ip.getId());
                if (id.getId() == null) {
                    id.setCreateDate(instant);
                }
                id.setUpdateDate(instant);
                if (id.getItemName() != null && id.getItemType() != null)
                    lstDetailDTO.add(id);
            }
        }

        // process data
        BigDecimal subTotal = calculateSubTotal(lstPackageDetails);

        if (check > 0) {
            // find near office
            Office ofc = officeRepository.searchOfficeNearby(fromStreet.getId(), fromStreet.getSubDistrictId().getId(),
                fromStreet.getSubDistrictId().getDistrictId().getId());
            if (ofc != null) invoiceHeaderDTO.setOfficeId(ofc.getId());

            // process collect shipment and sub total fee
            PersonalShipment ps = new PersonalShipment();
            ps.setInvoiceHeaderId(invoiceHeaderDTO.getId());
            ps.setShipmentType("collect");
            ps.setStatus("");
            ps.setCreateDate(instant);
            ps.setUpdateDate(instant);

            // get employee and add to shipment
            WorkingArea wa = workingAreaRepository.findDistinctByStreetId(fromStreet.getId());
            if (wa == null) wa = workingAreaRepository.getEmployeeNearBy(fromStreet.getId());
            if (wa != null) ps.setEmployeeId(wa.getEmployeeId());
            lstShipment.add(ps);
        } else {
            invoiceHeaderDTO.setStatus("receive");
        }
        invoiceHeaderDTO.setSubTotal(subTotal);
        invoiceHeaderDTO.setTaxAmount(subTotal.multiply(new BigDecimal("0.1")));
        invoiceHeaderDTO.setTotalDue(subTotal.multiply(new BigDecimal("1.1")));
        // finish = true, can import
        invoiceHeaderDTO.setFinish(true);

        // set employee and add delivery
        PersonalShipment psDelivery = new PersonalShipment();
        psDelivery.setInvoiceHeaderId(invoiceHeaderDTO.getId());
        psDelivery.setStatus("");
        psDelivery.setShipmentType("delivery");
        psDelivery.setCreateDate(instant);
        psDelivery.setUpdateDate(instant);
        WorkingArea wa = workingAreaRepository.findDistinctByStreetId(toStreet.getId());
        if (wa == null) wa = workingAreaRepository.getEmployeeNearBy(toStreet.getId());
        if (wa != null) psDelivery.setEmployeeId(wa.getEmployeeId());
        lstShipment.add(psDelivery);

        // check online of offline create invoice if it is create by officer
        if (invoiceHeaderDTO.getEmployeeId() != null) {
            invoiceHeaderDTO.setStatus("received");
        }

        // save data
        personalShipmentRepository.saveAll(lstShipment);
        invoiceDetailsRepository.saveAll(invoiceDetailsMapper.toEntity(lstDetailDTO));

        // process invoice header no and save
        String invNo = "INV" + LocalDate.now().getYear() + "-" + String.format("%010d", invoiceHeaderDTO.getId());
        invoiceHeaderDTO.setInvoiceNo(invNo);
        invoiceHeaderDTO = this.save(invoiceHeaderDTO);

        return invoiceHeaderDTO;
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
    public List<InvoiceHeaderDTO> saveInvoiceHeadersApproved(List<InvoiceHeaderDTO> invoiceHeadersDTO) {
        List<InvoiceHeader> result = invoiceHeaderMapper.toEntity(invoiceHeadersDTO);
        List<PersonalShipment> shipmentList = new ArrayList<>();
        for (InvoiceHeader i : result) {
            i.setUpdateDate(Instant.now());
            i.setCancel(true);
            i.setChangeNote("approved");
            List<PersonalShipment> sList = personalShipmentRepository.getShipmentByInvoice(i.getId());
            for (PersonalShipment ii : sList) {
                if (!ii.getStatus().equalsIgnoreCase("finish"))
                    ii.setStatus("cancel");
            }
            shipmentList.addAll(sList);
        }

        personalShipmentRepository.saveAll(shipmentList);
        return invoiceHeaderMapper.toDto(invoiceHeaderRepository.saveAll(result));
    }

    @Override
    public Page<InvoiceHeaderDTO> getInvoiceHeadersByCustomer(Long id, Pageable pageable) {
        return invoiceHeaderRepository.getInvoiceHeadersByCustomer(id, pageable).map(invoiceHeaderMapper::toDto);
    }

    @Override
    public List<InvoiceHeaderDTO> saveListImportInvoiceHeader(List<InvoiceHeaderDTO> list) {
        List<InvoiceHeader> result = invoiceHeaderMapper.toEntity(list);
        for (InvoiceHeader i : result) {
            i.setUpdateDate(Instant.now());
            i.setStatus("last_import");
        }
        result = invoiceHeaderRepository.saveAll(result);
        return invoiceHeaderMapper.toDto(result);
    }

    @Override
    public InvoiceHeaderDTO updateFinishInvoicePersonalShipment(InvoiceHeaderDTO inv) {
        InvoiceHeader ih = invoiceHeaderRepository.getOne(inv.getId());
        if (!ih.getStatus().equalsIgnoreCase("delivering")) {
            throw new BadRequestAlertException("Invalid status", "InvoiceHeader", "status wrong");
        }
        PersonalShipment ps = personalShipmentRepository.getDeliveryShipmentByInvoice(inv.getId());
        Instant instant = Instant.now();
        ih.setStatus("finish");
        ps.setStatus("finish");
        ih.setFinishDate(instant);
        ih.setUpdateDate(instant);
        ps.setFinishTime(instant);
        ps.setUpdateDate(instant);
        personalShipmentRepository.save(ps);

        return invoiceHeaderMapper.toDto(invoiceHeaderRepository.save(ih));
    }

    @Override
    public Page<InvoiceHeaderDTO> getInvoiceHeadersWaitingReview(Long id, String invoiceNo,
                                                                 String receiveDate, String createDate, String updateDate, Pageable pageable) {
        Page<InvoiceHeader> page = invoiceHeaderRepository.getInvoiceHeadersWaitingReview(id, invoiceNo,
            receiveDate, createDate, updateDate, pageable);
        return page.map(invoiceHeaderMapper::toDto);
    }

    private InvoicePackageDetailDTO converterInvoicePackageDetailDTO(InvoiceHeader inv) {
        InvoicePackageDetailDTO dto = new InvoicePackageDetailDTO();
        dto.setInvoice(invoiceHeaderMapper.toDto(inv));
        List<PackageDetailsDTO> packageList = new ArrayList<>();
        List<InvoicePackageDTO> pkDtoList = invoicePackageMapper
            .toDto(invoicePackageRepository.getInvoicePackageByHeaderId(inv.getId()));
        List<InvoiceDetailsDTO> idDtoList = invoiceDetailsMapper
            .toDto(invoiceDetailsRepository.getInvoiceDetailsByHeaderId(inv.getId()));
        for (InvoicePackageDTO ip : pkDtoList) {
            PackageDetailsDTO p = new PackageDetailsDTO();
            p.setInvPackage(ip);
            p.setItemList(new ArrayList<>());
            for (InvoiceDetailsDTO id : idDtoList) {
                if (id.getInvoicePackageId() == ip.getId())
                    p.getItemList().add(id);
            }
            packageList.add(p);
        }
        dto.setPackageList(packageList);
        return dto;
    }

    @Override
    public InvoiceHeaderDTO updateInvoiceHeadersReview(InvoiceHeaderDTO invoice) {
        List<PersonalShipment> ipList = personalShipmentRepository.getAllShipmentByHeaderId(invoice.getId());
        String rs = invoice.getNote().substring(invoice.getNote().length() - 2);
        invoice.setNote(invoice.getNote().substring(0, invoice.getNote().length() - 2));
        if (rs.equalsIgnoreCase("OK")) {
            invoice.setFinish(true);
            if (ipList.size() == 2) {
                invoice.setStatus("collect");
            } else {
                invoice.setStatus("receive");
            }
            for (PersonalShipment ps : ipList) {
                if (ps.getShipmentType().equals("collect")) ps.setStatus("new");
            }
        } else {
            invoice.setStatus("cancel");
        }
        invoice.setUpdateDate(Instant.now());
        invoice.setReviewDate(Instant.now());

        personalShipmentRepository.saveAll(ipList);
        return invoiceHeaderMapper.toDto(invoiceHeaderRepository.save(invoiceHeaderMapper.toEntity(invoice)));
    }

    @Override
    public Page<InvoicePackageDetailDTO> getFullInvoiceByPayment(Long id, String invoiceNo, String status,
                                                                 String receiveFrom, String receiveTo, String createFrom, String createTo, Pageable pageable) {
        Page<InvoiceHeader> page = invoiceHeaderRepository.getFullInvoiceByPayment(id, invoiceNo, status,
            receiveFrom, receiveTo, createFrom, createTo, pageable);
        return page.map(this::converterInvoicePackageDetailDTO);
    }

    @Override
    public Page<InvoicePackageShipmentDTO> getImportInvoiceByOfficer(Long id, Long oid, String invNo, String from,
                                                                     String to, Pageable pageable) {
        Page<InvoiceHeader> page = invoiceHeaderRepository.getImportInvoiceByOfficer(id, oid, invNo, from, to, pageable);
        return page.map(this::toInvoicePackageShipmentDTO);
    }

    @Override
    public Page<InvoicePackageShipmentDTO> getInvoiceByWarehouse(Long id, String invNo, Pageable pageable) {
        Page<InvoiceHeader> page = invoiceHeaderRepository.getInvoiceByWarehouse(id, invNo, pageable);
        return page.map(this::toInvoicePackageShipmentDTO);
    }

    @Override
    public InvoiceHeaderDTO approveCancelInvoiceHeaders(Long id) {
        InvoiceHeader inv = invoiceHeaderRepository.getOne(id);
        List<PersonalShipment> psList = personalShipmentRepository.getAllShipmentByHeaderId(id);
        inv.setChangeNote("approved");
        inv.setStatus("cancel");
        inv.setCancel(true);
        for (PersonalShipment ps : psList) {
            ps.setStatus("cancel");
        }
        personalShipmentRepository.saveAll(psList);
        return invoiceHeaderMapper.toDto(invoiceHeaderRepository.save(inv));
    }

    @Override
    public InvoiceHeaderDTO saveInvoiceHeaderDetailPackage(InvoicePackageDetailDTO invoiceHeaderDTO) {
        InvoiceHeader inv = invoiceHeaderMapper.toEntity(invoiceHeaderDTO.getInvoice());
        List<InvoiceDetails> invDetails = new ArrayList<>();
        for (PackageDetailsDTO pd : invoiceHeaderDTO.getPackageList()) {
            InvoicePackage ip = invoicePackageMapper.toEntity(pd.getInvPackage());
            ip = invoicePackageRepository.save(ip);

            List<InvoiceDetails> idList = invoiceDetailsMapper.toEntity(pd.getItemList());
            for (InvoiceDetails id : idList) {
                if (id.getItemName() != null && id.getItemType() != null) {
                    id.setInvoiceHeaderId(inv.getId());
                    id.setInvoicePackageId(ip.getId());
                    invDetails.add(id);
                }
            }
        }

        invoiceDetailsRepository.saveAll(invDetails);
        return invoiceHeaderMapper.toDto(invoiceHeaderRepository.save(inv));
    }

    private InvoicePackageShipmentDTO toInvoicePackageShipmentDTO(InvoiceHeader inv) {
        InvoicePackageShipmentDTO dto = new InvoicePackageShipmentDTO();
        List<InvoicePackage> list = invoicePackageRepository.getInvoicePackageByHeaderId(inv.getId());

        dto.setInvoiceHeader(invoiceHeaderMapper.toDto(inv));
        dto.setInvoicePackageList(invoicePackageMapper.toDto(list));
        return dto;
    }

}
