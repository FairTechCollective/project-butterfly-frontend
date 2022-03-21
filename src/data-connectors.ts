import {DataSource} from './data-source'
import {Filter, FilterSource} from './filter-source'

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
    abstract getDataSource(): Promise<DataSource>;
    abstract makeFilters(): FilterSource[];
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
        return (makeRequest('GET', this.urlBase + 'facilities/region/9') as Promise<string>)
        .then((response: string) => {
            const facilities = JSON.parse(response) as BenzeneReportFacility[];
            this.facilities.push(...facilities.filter(({state}) => state === 'CA'))
        })
    }

    makeFilters(): FilterSource[] {
        const bayAreaFacilities = 
            this.facilities.filter(({county}) => county !== 'Los Angeles');
        const losAngelesFacilities = 
            this.facilities.filter(({county}) => county === 'Los Angeles');
        const bayArea = {
            label: 'Bay Area',
            tag: 'bay-area',
            checked: false,
            options: [
                {
                    label: 'Cities',
                    tag: 'cities',
                    checked: false,
                    options: bayAreaFacilities.map((facility) => {
                        return {
                            label: facility.city,
                            tag: convertToTag(facility.city),
                            options: [] as Filter[],
                            checked: false,
                        };
                    }),
                },
                {
                    label: 'Refinerires',
                    tag: 'refineries',
                    checked: false,
                    options: bayAreaFacilities.map((facility) => {
                        return {
                            label: facility.facility,
                            tag: convertToTag(facility.facility),
                            options: [] as Filter[],
                            checked: false,
                        };
                    }),
                }
            ],
        };
        const losAngeles = {
            label: 'Los Angeles County',
            tag: 'los-angeles',
            checked: false,
            options: [
                {
                    label: 'Cities',
                    tag: 'cities',
                    checked: false,
                    options: losAngelesFacilities.map((facility) => {
                        return {
                            label: facility.city,
                            tag: convertToTag(facility.city),
                            options: [] as Filter[],
                            checked: false,
                        };
                    }),
                },
                {
                    label: 'Refinerires',
                    tag: 'refineries',
                    checked: false,
                    options: losAngelesFacilities.map((facility) => {
                        return {
                            label: facility.facility,
                            tag: convertToTag(facility.facility),
                            options: [] as Filter[],
                            checked: false,
                        };
                    }),
                }
            ],
        };
        return [
            {
                header: 'Locations',
                filters: [bayArea, losAngeles]
            },
            {
                header: 'Chemicals',
                filters: [
                    {
                        label: 'Benzene',
                        tag: 'benzene',
                        checked: false,
                        options: [] as Filter[],
                    },
                ]
            },
        ];
    }

    getDataSource(): Promise<DataSource> {
        return this.initializeFacilities().then(() => {
            const tags = [
                this.facilities.map(({city}) => convertToTag(city)),
                this.facilities.map(({facility}) => convertToTag(facility)),
                'benzene',
            ].flat();
            return {
                title: 'The Benzene Report',
                description: `Oil refineries are required by the US EPA to encircle their properties with air samplers. The samplers measure levels of benzene, a known carcinogen, in the ambient air. Refineries report two-week average benzene levels to the EPA every three months. Benzene monitoring data from refineries can help nearby communities learn what they’re breathing, day in and day out. It can also help researchers learn about correlations between environmental exposures and illness, and disparities in pollution across racial groups, income levels, and geographic regions.`,
                tags: new Set(tags),
                startTime: new Date('2018-01-24T00:00:00'),
                endTime: new Date('2021-03-31T00:00:00'),
                filters: this.makeFilters(),
            };
        })
    }
}