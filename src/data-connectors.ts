import {DataSource, TwoWeekPollutants} from './data-source'

function convertToTag(name: string) {
    return name.trim()
               .toLowerCase()
               .replaceAll(/[^\w]/g, '')
               .replaceAll(/\s+/g, ' ')
               .replaceAll(/\s/g, '-');
}

function makeRequest (method: string, url: string) {
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
    })
  }

abstract class DataConnector {
    abstract getDataSources(): Promise<DataSource[]>;
}

interface BenzeneReportFacility {
    id: number,
    facility: string,
    address: string,
    address2: string,
    city: string,
    county: string,
    state: string,
    zip_code: string,
    region: number,
}

export class BenzeneReport extends DataConnector{
    private readonly urlBase = 'https://fenceline-ambient-benzene-apims.azure-api.net/fenceline-ambient-benzene/';
    private facilities: BenzeneReportFacility[] = [];

    initializeFacilities() {
        return (makeRequest('GET', this.urlBase + 'facilities') as Promise<string>)
        .then((response: string) => {
            const facilities = JSON.parse(response) as BenzeneReportFacility[];
            this.facilities.push(...facilities)
        })
    }

    getDataSources(): Promise<DataSource[]> {
        return this.initializeFacilities().then(() => {
            return this.facilities.map((facility: BenzeneReportFacility, i: number)=>{
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
        })
    }
}