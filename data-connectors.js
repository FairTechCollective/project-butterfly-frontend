import { TwoWeekPollutants } from './data-source';
function convertToTag(name) {
    return name.trim()
        .toLowerCase()
        .replaceAll(/[^\w]/g, '')
        .replaceAll(/\s+/g, ' ')
        .replaceAll(/\s/g, '-');
}
function makeRequest(method, url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = () => {
            resolve(xhr.response);
        };
        xhr.onerror = () => {
            reject(xhr.response);
        };
        xhr.send();
    });
}
class DataConnector {
}
export class BenzeneReport extends DataConnector {
    constructor() {
        super(...arguments);
        this.urlBase = 'https://fenceline-ambient-benzene-apims.azure-api.net/fenceline-ambient-benzene/';
        this.facilities = [];
    }
    initializeFacilities() {
        return makeRequest('GET', this.urlBase + 'facilities')
            .then((response) => {
            const facilities = JSON.parse(response);
            this.facilities.push(...facilities);
        });
    }
    getDataSources() {
        return this.initializeFacilities().then(() => {
            return this.facilities.map((facility, i) => {
                const tags = [
                    convertToTag(facility.city),
                    convertToTag(facility.facility),
                    'benzene',
                ];
                return {
                    name: facility.facility,
                    tags: new Set(tags),
                    startTime: new Date('2018-01-24T00:00:00'),
                    endTime: new Date('2021-03-31T00:00:00'),
                    address: facility.address,
                    city: facility.city,
                    state: facility.state,
                    company: facility.facility,
                    twoWeekPollutants: [TwoWeekPollutants.Benzene],
                    continuousPollutants: [],
                    ranking: i,
                    benzeneConcentration: parseFloat((i + Math.random()).toFixed(2)),
                    benzeneWeeksExceeding: Math.floor(Math.random() * 10),
                };
            });
        });
    }
}
//# sourceMappingURL=data-connectors.js.map