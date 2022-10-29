import BaseModel       from '@/models/utils/BaseModel';
import ListResult      from '@/models/utils/ListResult';
import BaseCrudService from '@/services/utils/BaseCrudService';

export default abstract class SubCrudService<M extends BaseModel> extends BaseCrudService<M> {
    /**
     * Base path for the crud actions (without trailing slash, eg. '/collections/{:sub}/records').
     */
    abstract baseCrudPath(sub: string): string

    /**
     * Returns a promise with all list items batch fetched at once.
     */
    getFullList<T={}>(sub: string, batchSize = 100, queryParams = {}): Promise<Array<T&M>> {
        return this._getFullList(this.baseCrudPath(sub), batchSize, queryParams) as Promise<Array<T&M>>;
    }

    /**
     * Returns paginated items list.
     */
    getList<T={}>(sub: string, page = 1, perPage = 30, queryParams = {}): Promise<ListResult<T&M>> {
        return this._getList(this.baseCrudPath(sub), page, perPage, queryParams)as Promise<ListResult<T&M>>;
    }

    /**
     * Returns single item by its id.
     */
    getOne<T={}>(sub: string, id: string, queryParams = {}): Promise<T&M> {
        return this._getOne(this.baseCrudPath(sub), id, queryParams) as Promise<T&M>;
    }

    /**
     * Creates a new item.
     */
    create<T={}>(sub: string, bodyParams = {}, queryParams = {}): Promise<T&M> {
        return this._create(this.baseCrudPath(sub), bodyParams, queryParams)as Promise<T&M>;
    }

    /**
     * Updates an existing item by its id.
     */
    update<T={}>(sub: string, id: string, bodyParams = {}, queryParams = {}): Promise<T&M> {
        return this._update(this.baseCrudPath(sub), id, bodyParams, queryParams)as Promise<T&M>;
    }

    /**
     * Deletes an existing item by its id.
     */
    delete(sub: string, id: string, queryParams = {}): Promise<boolean> {
        return this._delete(this.baseCrudPath(sub), id, queryParams);
    }
}
