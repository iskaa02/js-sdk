
import CrudService from '@/services/utils/CrudService';
import View  from '@/models/View';
import { ViewRecord } from '..';

export default class Views extends CrudService<View> {
    /**
     * @inheritdoc
     */
    decode(data: { [key: string]: any }): View {
        return new View(data);
    }

    /**
     * @inheritdoc */

    get baseCrudPath(): string {
        return '/api/views';
    }

    getRecordsFullList(viewName: string, batchSize = 100, queryParams = {}): Promise<Array<ViewRecord>> {
        const basePath= `${this.baseCrudPath}/${viewName}/records`
        var result: Array<ViewRecord> = [];

        let request = async (page: number): Promise<Array<any>> => {
            return this.getRecordsList(basePath, page, batchSize, queryParams).then((list) => {
                console.log(list);
                
                const castedList = (list as ViewRecordListResult);
                const items = castedList.items;
                const totalItems = castedList.totalItems;

                result = result.concat(items);

                if (items.length && totalItems > result.length) {
                    return request(page + 1);
                }

                return result;
            });
        }

        return request(1);
    }

    /**
     * Returns paginated items list.
     */
    getRecordsList(viewName: string, page = 1, perPage = 30, queryParams = {}): Promise<ViewRecordListResult> {
        const basePath= `${this.baseCrudPath}/${viewName}/records`
        queryParams = Object.assign({
            'page':    page,
            'perPage': perPage,
        }, queryParams);

        return this.client.send(basePath, {
            'method': 'GET',
            'params': queryParams,
        }).then((responseData: any) => {
            const items: Array<ViewRecord> = [];
            if (responseData?.items) {
                responseData.items = responseData.items || [];
                for (const item of responseData.items) {
                    items.push(new ViewRecord(item));
                }
            }

            return new ViewRecordListResult(
                responseData?.page || 1,
                responseData?.perPage || 0,
                responseData?.totalItems || 0,
                responseData?.totalPages || 0,
                items,
            );
        });
    }
}

 class ViewRecordListResult{
    page!: number;
    perPage!: number;
    totalItems!: number;
    totalPages!: number;
    items!: Array<ViewRecord>;

    constructor(
        page: number,
        perPage: number,
        totalItems: number,
        totalPages: number,
        items: Array<ViewRecord>,
    ) {
        this.page = page > 0 ? page : 1;
        this.perPage = perPage >= 0 ? perPage : 0;
        this.totalItems = totalItems >= 0 ? totalItems : 0;
        this.totalPages = totalPages >= 0 ? totalPages : 0;
        this.items = items || [];
    }
}
