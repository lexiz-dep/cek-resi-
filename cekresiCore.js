const axios = require('axios');
const cheerio = require('cheerio');
const FormData = require('form-data');
const CryptoJS = require('crypto-js');

function createTimers(resi) {
    try {
        const keyHex = "79540e250fdb16afac03e19c46dbdeb3";
        const ivHex = "eb2bb9425e81ffa942522e4414e95bd0";
        
        const key = CryptoJS.enc.Hex.parse(keyHex);
        const iv = CryptoJS.enc.Hex.parse(ivHex);
        
        const encrypted = CryptoJS.AES.encrypt(resi, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        
        return encrypted.toString();
    } catch (error) {
        return null;
    }
}

async function cekresi(noresi, ekspedisi) {
    try {
        const _ekspedisi = {
            'shopee-express': 'SPX',
            'ninja': 'NINJA',
            'lion-parcel': 'LIONPARCEL',
            'pos-indonesia': 'POS',
            'tiki': 'TIKI',
            'acommerce': 'ACOMMERCE',
            'gtl-goto-logistics': 'GTL',
            'paxel': 'PAXEL',
            'sap-express': 'SAP',
            'indah-logistik-cargo': 'INDAH',
            'lazada-express-lex': 'LEX',
            'lazada-logistics': 'LEL',
            'janio-asia': 'JANIO',
            'jet-express': 'JETEXPRESS',
            'pcp-express': 'PCP',
            'pt-ncs': 'NCS',
            'nss-express': 'NSS',
            'grab-express': 'GRAB',
            'rcl-red-carpet-logistics': 'RCL',
            'qrim-express': 'QRIM',
            'ark-xpress': 'ARK',
            'standard-express-lwe': 'LWE',
            'luar-negeri-bea-cukai': 'BEACUKAI'
        };
        
        if (!noresi) throw new Error('Nomor resi diperlukan');
        if (!Object.keys(_ekspedisi).includes(ekspedisi)) throw new Error(`List ekspedisi yang tersedia: ${Object.keys(_ekspedisi).join(', ')}`);
        
        const { data: html } = await axios.get('https://cekresi.com/');
        const $ = cheerio.load(html);
        
        const timers = await createTimers(noresi.toUpperCase().replace(/\s/g, ''));
        const form = new FormData();
        form.append('viewstate', $('input[name="viewstate"]').attr('value'));
        form.append('secret_key', $('input[name="secret_key"]').attr('value'));
        form.append('e', _ekspedisi[ekspedisi]);
        form.append('noresi', noresi.toUpperCase().replace(/\s/g, ''));
        form.append('timers', timers);
        
        const { data } = await axios.post(`https://apa2.cekresi.com/cekresi/resi/initialize.php?ui=e0ad7e971ce77822056ba7a155f85c11&p=1&w=${Math.random().toString(36).substring(7)}`, form, {
            headers: {
                ...form.getHeaders(),
                referer: 'https://cekresi.com/',
                origin: 'https://cekresi.com',
                'user-agent': 'Mozilla/5.0'
            }
        });
        
        const $response = cheerio.load(data);
        
        const result = {
            success: false,
            message: '',
            data: {
                resi: noresi,
                ekspedisi: '',
                ekspedisiCode: _ekspedisi[ekspedisi],
                status: '',
                tanggalKirim: '',
                customerService: '',
                lastPosition: '',
                shareLink: '',
                history: []
            }
        };
        
        const alertSuccess = $response('.alert.alert-success');
        if (alertSuccess.length > 0) {
            result.success = true;
            result.message = alertSuccess.text().trim();
            
            const ekspedisiName = $response('#nama_expedisi').text().trim();
            if (ekspedisiName) result.data.ekspedisi = ekspedisiName;
            
            const infoTable = $response('table.table-striped tbody tr');
            infoTable.each((index, element) => {
                const cells = $response(element).find('td');
                if (cells.length >= 3) {
                    const label = $response(cells[0]).text().trim();
                    const value = $response(cells[2]).text().trim();
                    
                    switch (label) {
                        case 'Tanggal Pengiriman':
                            result.data.tanggalKirim = value;
                            break;
                        case 'Status':
                            result.data.status = value;
                            break;
                    }
                }
            });
            
            const csText = $response('h5 center').text();
            if (csText && csText.includes('Customer Service Phone:')) result.data.customerService = csText.replace('Customer Service Phone:', '').trim();
            
            const lastPosition = $response('#last_position').text().trim();
            if (lastPosition) result.data.lastPosition = lastPosition;
            
            const shareLink = $response('#linkcekresi').attr('value');
            if (shareLink) result.data.shareLink = shareLink;
            
            const historyTable = $response('h4:contains("History")').next('table').find('tbody tr');
            historyTable.each((index, element) => {
                const cells = $response(element).find('td');
                if (cells.length >= 2 && index > 0) {
                    const tanggal = $response(cells[0]).text().trim();
                    const keterangan = $response(cells[1]).text().trim();
                    
                    if (tanggal && keterangan) {
                        result.data.history.push({
                            tanggal: tanggal,
                            keterangan: keterangan
                        });
                    }
                }
            });
        } else {
            const alertError = $response('.alert.alert-danger, .alert.alert-warning');
            if (alertError.length > 0) {
                result.message = alertError.text().trim();
            } else {
                result.message = 'Tidak dapat mengambil informasi resi';
            }
        }
        
        return result;
    } catch (error) {
        return {
            success: false,
            message: error.message,
            data: null
        };
    }
}

module.exports = cekresi;
