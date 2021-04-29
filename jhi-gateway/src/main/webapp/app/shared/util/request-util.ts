import { HttpParams } from '@angular/common/http';

export const createRequestOption = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
    if (req) {
        Object.keys(req).forEach(key => {
            if (key !== 'sort') {
                options = options.set(key, req[key]);
            }
        });
        if (req.sort) {
            req.sort.forEach(val => {
                options = options.append('sort', val);
            });
        }
    }
    return options;
};

export class CommonString {
    listTypeShipment: any = [{ id: 'collect', text: 'Lấy hàng' }, { id: 'delivery', text: 'Giao hàng' }];
    listStatusShipment: any = [
        { id: 'new', text: 'Chưa xử lý' },
        { id: 'collecting', text: 'Nhân viên bắt đầu lấy hàng' },
        { id: 'delivering', text: 'Nhân viên bắt đầu giao hàng' },
        { id: 'fail_num1', text: 'Giao hàng không thành công lần: 1' },
        { id: 'fail_num2', text: 'Giao hàng không thành công lần: 2' },
        { id: 'fail_num3', text: 'Giao hàng không thành công lần: 3' },
        { id: 'finish', text: 'Hoàn thành' },
        { id: 'cancel', text: 'Hủy' }
    ];
    listStatusInvoice: any = [
        { id: 'new', text: 'Chờ xử lý' },
        { id: 'collect', text: 'Chờ nhân viên lấy hàng' },
        { id: 'receive', text: 'Chờ khách giao hàng' },
        { id: 'collected', text: 'Nhân viên đã lấy hàng' },
        { id: 'first_import', text: 'Nhập kho chi nhánh đầu' },
        { id: 'transporting', text: 'Đang vận chuyển' },
        { id: 'last_import', text: 'Nhập kho chi nhánh cuối' },
        { id: 'delivering', text: 'Đang giao hàng' },
        { id: 'finish', text: 'Giao hàng thành công' },
        { id: 'lost', text: 'Phát sinh thất lạc ' },
        { id: 'cancel', text: 'Hủy' }
    ];
    listStatusPackage: any = [
        { id: 'new', text: 'Chưa nhập kho' },
        { id: 'first_import', text: 'Nhập kho chi nhánh đầu' },
        { id: 'transporting', text: 'Đang vận chuyển' },
        { id: 'last_import', text: 'Nhập kho chi nhánh cuối' },
        { id: 'delivering', text: 'Đang giao hàng' },
        { id: 'finish', text: 'Giao thành công' },
        { id: 'lost', text: 'Phát sinh thất lạc' },
        { id: 'cancel', text: 'Hủy' }
    ];

    processShipmentType(input: string) {
        let rs;
        for (const str of this.listTypeShipment) {
            if (str.id === input) {
                rs = str.text;
                break;
            }
        }
        return rs;
    }

    processShipmentStatus(input: string) {
        let rs;
        for (const str of this.listStatusShipment) {
            if (str.id === input) {
                rs = str.text;
                break;
            }
        }
        return rs;
    }

    processInvoiceStatus(input: string) {
        let rs;
        for (const str of this.listStatusInvoice) {
            if (str.id === input) {
                rs = str.text;
                break;
            }
        }
        return rs;
    }

    processPackageStatus(input: string) {
        let rs;
        for (const str of this.listStatusPackage) {
            if (str.id === input) {
                rs = str.text;
                break;
            }
        }
        return rs;
    }
}
