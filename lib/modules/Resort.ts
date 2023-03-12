import Vue from 'vue';
import { Module} from 'vuex-module-accessor';
import { ResidenceApi } from '../resort-service/index';
import { Comments, Image, Meta, Resort, Score, singleResort, CityMeta, Amenities, ResortType, pricePerDate } from './Types/resort';
import Axios from 'axios';
export default class ResortModule extends Module<ResortModuleState> {
	/**
	 * Creates an instance of ResortModule
	 *
	 * @memberof ResortModule
	 */
	constructor() {
		super(ResortModuleState);
	}

	/**
	 * mutations
	 */

    /**
	 * Set Default cities in city input - before searching city
     * @param defaultCitiesList
	 * @memberof ResortModule
	 */
    set defaultCities(payload: Cities[]) {
        this.state.defaultCities = payload
    }

    /**
     * set SearchedCity after user type in city input
     * @param searchedCity
     * @memberof ResortModule
     */
    set searchedCity(payload: Cities[]) {
        this.state.searchedCity = payload;
    }

    /**
     * set resorts list
     * @param { Resort[] } resortsList
     * @memberof ResortModule
     */
    set resortsList(payload: Resort[]) {
        this.state.resortsList = payload;
    }

    /**
     * set resorts list
     * @param { Resort[] } filteredResortsList
     * @memberof ResortModule
     */
    set filteredResortsList(payload: Resort[]) {
        this.state.filteredResortsList = payload;
    }

    /**
     * set resort deatil
     * @param { number } resortId
     * @param { Meta } meta
     * @param { Image[] } images
     * @param { Comments[] } comments
     * @memberof ResortModule
     */
    set resortDetail(payload: { resortId: number, meta: Meta, images: Image[], comments: Comments[]}) {
        const resort = this.state.resortsList.find((hotel: Resort) => hotel.Id === payload.resortId);
        if (resort && resort.Detail) {
            resort.Detail.Comments = payload.comments;
            resort.Detail.Images = payload.images;
            Vue.set(resort.Detail , 'Meta', payload.meta);
        }
    }

	/**
	 * Get special resorts'similar hotels
	 *
	 * @memberof ResortModule
	 * @param {object} params
	 */
	getSimilarResort(hotelId: number) {
		new ResidenceApi().apiResidenceSimilarGet(hotelId).then((res: any) => {
			this.similarResorts = res.data.Result;
		});
	}
    /**
     * set soreted resorts list
     * @param { string } type
     * @param { string } order
     * @memberof ResortModule
     */
    set sortResort(payload: {type: string, order: number}) {
		this.state.sortType = payload.type;
		this.state.order = payload.order;
        if (this.state.filteredResortsList && this.state.filteredResortsList.length) {
            switch (payload.type) {
                case 'AverageRate':
                    this.state.filteredResortsList.sort(function (a: Resort, b: Resort) {
                        const result = ((a.AverageRate ? a.AverageRate : 0) > (b.AverageRate ? b.AverageRate : 0)) ? -1 : ((a.AverageRate ? a.AverageRate : 0) < (b.AverageRate ? b.AverageRate : 0)) ? 1 : 0;
                        return result * payload.order;
                    });
                    break;
                case 'CommentsCount':
                    this.state.filteredResortsList.sort(function (a: Resort, b: Resort) {
                        const result = (a.CommentsCount > b.CommentsCount) ? -1 : (a.CommentsCount < b.CommentsCount) ? 1 : 0;
                        return result * payload.order;
                    });
                    break;
                case 'MinPrice':
                    this.state.filteredResortsList.sort(function (a: Resort, b: Resort) {
                        const result = (a.Seller.TotalPrice > b.Seller.TotalPrice) ? -1 : (a.Seller.TotalPrice < b.Seller.TotalPrice) ? 1 : 0;
                        return result * payload.order;
                    });
                    break;
            }
        }
	}

    /**
     * make selected scores array
     * @param { Score } Scroe
     * @memberof ResortModule
     */
    set selectedScore(Score: Score[]) {
        this.state.selectedScores = Score;
    }

    /**
     * set city from url paramter
     * @param { string } cityNameEn
     * @memberof ResortModule
     */
    set searchedCityInUrl(cityNameEn: string) {
        this.state.searchedCityInUrl = cityNameEn
    }

    /**
     * set loading
     * @param { boolean } loading
     * @memberof ResortModule
     */
    set resortLoading(loading: boolean) {
        this.state.resortLoading = loading
    }

    /**
     * set error
     * @param { boolean } error
     * @memberof ResortModule
     */
    set error(loading: boolean) {
        this.state.error = loading
    }

    /**
     * set single resort detail
     * @param { Resort } resort
     * @memberof ResortModule
     */
    set singleResort(resort: singleResort) {
        this.state.singleResort = resort
    }

     /**
     * set city meta (Types, Aminities, MinPrice, MaxPrice)
     * @param { Resort } resort
     * @memberof ResortModule
     */
    set cityMeta(meta: CityMeta) {
        this.state.cityMeta = meta
    }

    /**
     * set selected Aminities
     * @param { Amenities[] } payload
     * @memberof ResortModule
     */
    set selectedAminities(payload: Amenities[]) {
        this.state.selectedAminities = payload
    }

    /**
     * set selected types
     * @param { ResortType[] } payload
     * @memberof ResortModule
     */
    set selectedTypes(payload: ResortType[]) {
        this.state.selectedTypes = payload
    }

    /**
     * set selected Prices
     * @memberof ResortModule
     */
    set updatePriceSilder(payload: Array<number>) {
        this.state.selectedMinPrice = payload[0];
        this.state.selectedMaxPrice = payload[1];
    }

    /**
     * set city meta prices
     * @memberof ResortModule
     */
    set metaPrice(payload: Array<number>) {
        this.state.minPrice = payload[0];
        this.state.maxPrice = payload[1];
    }

    /**
     * set price per date for single resort
     * @memberof ResortModule
     */
    set pricePerDate(payload: Array<pricePerDate>) {
        this.state.pricePerDate = payload;
    }

    /**
     * set similar resorts
     * @memberof ResortModule
     */
    set similarResorts(payload: Array<object>) {
        this.state.similarResorts = payload;
    }

    /**
	 * getters
	 */

    /**
     * get resort count array in different range of prices
     * @memberof ResortModule
     */     
    get resortCountArray() {
		const min = this.state.cityMeta.MinPrice;
		const max = this.state.cityMeta.MaxPrice;
		const duration = (max - min) / 20;
		let start = min;
		const arr = [];
		for (let i = 1; i < 21; i++) {
			let count = 0;
			for (let j = 0; j < this.state.resortsList.length; j++) {
				if (start <= this.state.resortsList[j].Seller.TotalPrice && start + duration >= this.state.resortsList[j].Seller.TotalPrice) {
					count += 1;
				}
			}
			arr.push({ start, end: min + (duration * i), count });
			start = min + (duration * i);
		}
		return arr;
    }
    

    get pricePerDate() {
        const initialValue = {};
        return this.state.pricePerDate.reduce((obj : any, item) => {
          return {
            ...obj,
            [item['Date'].slice(0, 10)]: item,
          };
        }, initialValue);
    }

    /**
	 * actions
	 */

    /**
     * load default cities
     * @memberof ResortModule
     */
    loadDefaultCities() {
        new ResidenceApi().apiResidenceDefaultCitiesGet().then((res : any) => {
            this.defaultCities = res.data.Result;
        })
    }

    /**
     * Search request for city names
     * @param cityName
     * @memberof ResortModule
     */
    async searchForCity(payload: string) {
        const Res: any = await new ResidenceApi().apiResidenceSuggestionGet(payload)
        this.searchedCity = Res.data.Result
    }

    async searchForCityInUrl(payload: string) {
        const Res: any = await new ResidenceApi().apiResidenceSuggestionGet(payload);
        this.searchedCityInUrl = Res.data.Result[0];

    }

    /**
     * Search for resort
     * @param { string } cityName
     * @param { string } checkInDate
     * @param { string } checkOutDate
     * @memberof ResortModule
     */
    resortSearch(payload: {cityName: string, checkInDate: string, checkOutDate: string, capacity: number}) {
        this.resortLoading = true;
        new ResidenceApi().apiResidenceSearchGet(payload.cityName, payload.checkInDate, payload.checkOutDate, payload.capacity).then((res: any) => {
            this.cityMeta = res.data.Result.Meta;
            this.resortsList = res.data.Result.Residences.map((item: Resort) => ({...item, Detail: {}}));
            this.updatePriceSilder = [res.data.Result.Meta.MinPrice, res.data.Result.Meta.MaxPrice];
            this.metaPrice = [res.data.Result.Meta.MinPrice, res.data.Result.Meta.MaxPrice];
            this.filterResort();
            this.resortLoading = false
            this.error = false;
        }).catch((err) => {
            this.error = true
        })
    }

    
    /**
     * load resort meta
     * @param { number } resortId
     * @memberof ResortModule
     */
    async resortMeta(resortId: number) {
       const res = await new ResidenceApi().apiResidenceMetaGet(resortId);
       return res;
    }

    /**
     * load resort comments
     * @param { number } resortId
     * @memberof ResortModule
     */
    async resortCommnets(resortId: number) {
        const res = await new ResidenceApi().apiResidenceCommentsGet(resortId);
        return res
    }

    /**
     * load resort comments
     * @param { number } resortId
     * @memberof ResortModule
     */
    async resortImages(resortId: number) {
        const res = await new ResidenceApi().apiResidenceImagesGet(resortId);
        return res
    }

    /**
     * load resort comments
     * @param { number } resortId
     * @memberof ResortModule
     */
    async singleResortPrice(payload: { resortId: number, checkInDate: string, checkOutDate: string } ) {
        const res = await new ResidenceApi().apiResidencePriceGet(payload.resortId, payload.checkInDate, payload.checkOutDate);
        return res
    }

	/**
	 * Get resorts'mate and images and comments promis
	 *
	 * @memberof ResortModule
	 * @param {number} resortId
	 */
	getResidenceDetail(resortId: number) {
		const metaRequest = this.resortMeta(resortId);
        const commentsRequest = this.resortCommnets(resortId);
        const imagesRequest = this.resortImages(resortId);
		Axios.all([metaRequest, imagesRequest, commentsRequest]).then(Axios.spread((...responses: any) => {
			this.resortDetail = {resortId: resortId, meta: responses[0].data.Result, images: responses[1].data.Result, comments: responses[2].data.Result };
		}));
	}


    /**
	 * Get single resorts'mate and images and comments promis
	 *
	 * @memberof ResortModule
	 * @param {number} resortId
	 */
	getSingleResortDetail(payload: {resortId: number, checkInDate: string, checkOutDate: string}) {
		const metaRequest = this.resortMeta(payload.resortId);
        const commentsRequest = this.resortCommnets(payload.resortId);
        const imagesRequest = this.resortImages(payload.resortId);
        const priceRequest = this.singleResortPrice({ resortId: payload.resortId, checkInDate: payload.checkInDate, checkOutDate: payload.checkOutDate});
		Axios.all([metaRequest.catch(() =>  null), imagesRequest.catch(() =>  null), commentsRequest.catch(() =>  null), priceRequest.catch(() =>  null)]).then(Axios.spread((...responses: any) => {
			this.singleResort = { Meta: responses[0] ? responses[0].data.Result : {}, Price: responses[3] && responses[3].data && responses[3].data.Result, Images: responses[1] && responses[1].data && responses[1].data.Result, Comments: responses[2] && responses[2].data &&  responses[2].data.Result };
		}))
	}

    async getPricePerDate(payload: {resortId: number, checkInDate: string, checkOutDate: string}) {
        new ResidenceApi().apiResidencePriceGet(payload.resortId, payload.checkInDate, payload.checkOutDate).then((res: any) => {
            this.pricePerDate = res.data.Result.DailyPrices;
        })
    }


    /**
	 * set selected score filters
	 *
	 * @memberof ResortModule
	 * @param {number} resortId
	 */
	selectedScoreFilter(payload: Score[]) {
        this.selectedScore = payload;
        const types = this.state.selectedScores.map((i: Score) => i.name);
        this.context.store?.$router.push({ path: this.context.store.$router.app.$options.router?.currentRoute.fullPath, query: { scores: types.join(',') } });
	}

    /**
	 * set selected Aminities filters
	 *
	 * @memberof ResortModule
	 * @param {number} resortId
	 */
	selectedAminitiesFilter(payload: Amenities[]) {
        this.selectedAminities = payload;
        const Aminities = this.state.selectedAminities.map((i: Amenities) => i.Name);
        this.context.store?.$router.push({ path: this.context.store.$router.app.$options.router?.currentRoute.fullPath, query: { Aminities: Aminities.join(',') } });
	}

        /**
	 * set selected Aminities filters
	 *
	 * @memberof ResortModule
	 * @param {number} resortId
	 */
	selectedTypesFilter(payload: ResortType[]) {
        this.selectedTypes = payload;
        const types = this.state.selectedTypes.map((i: ResortType) => i.Name);
        this.context.store?.$router.push({ path: this.context.store.$router.app.$options.router?.currentRoute.fullPath, query: { Types: types.join(',') } });
	}

    selectedPriceFilter(payload: Array<number>) {
        this.updatePriceSilder = payload;
        if (payload[0] && payload[1]) {
            this.context.store?.$router.push({ path: this.context.store.$router.app.$options.router?.currentRoute.fullPath, query: { selectedMinPrice: payload[0].toString(), selectedMaxPrice: payload[1].toString() } });
        }
    }


    filterResort() {
		const newArray = [];
        let types = this.state.selectedTypes && this.state.selectedTypes.length ? this.state.selectedTypes.map((i) =>  { return i.Name }) : [];
		for (let i = 0; i < this.state.resortsList.length; i++) {
			const filtered =
            (this.state.selectedMinPrice > this.state.resortsList[i].Seller.TotalPrice) ||
            (this.state.selectedMaxPrice < this.state.resortsList[i].Seller.TotalPrice) ||
            (this.state.selectedTypes.length && this.state.resortsList[i] && this.state.resortsList[i].Type && types.indexOf(this.state.resortsList[i].Type.FullName) === -1) ||
            (this.state.selectedAminities.length > 0 && !this.state.selectedAminities.some((amenity: Amenities) => !this.state.resortsList[i].Amenities?.map((res: any) => res).includes(amenity.Name))) ||
			(this.state.selectedScores.length && !this.state.selectedScores.some((item: Score) => ((item.max > (this.state.resortsList[i].AverageRate || 0) && item.min < (this.state.resortsList[i].AverageRate || 10)) || item.max === ( this.state.resortsList[i].AverageRate || 10))));
			if (!filtered) newArray.push(this.state.resortsList[i]);
		}
		this.filteredResortsList = newArray;
		const type = this.state.sortType;
		const order = this.state.order;
		this.sortResort = { type, order };
	}
}

/**
 * Cities class
 *
 * @memberof ResortModule
 */
class Cities {
    /**
     * 
     * @type {number}
     * @memberof DefaultCities
     */
    Id: number = 0;
    /**
     * 
     * @type {string}
     * @memberof DefaultCities
     */
    Type: string = '';
    /**
     * 
     * @type {string}
     * @memberof DefaultCities
     */
    NameFa: string = '';
    /**
     * 
     * @type {string}
     * @memberof DefaultCities
     */
    NameEn: string = '';
    /**
     * 
     * @type {number}
     * @memberof DefaultCities
     */
    ResidenceCount: number = 0;
}


class ResortModuleState {
    defaultCities: Cities[] = [];
    searchedCity: Cities[] = [];
    resortsList: Resort[] = [];
    filteredResortsList: Resort[] = [];
    sortType: string = 'AverageRate';
    order: number = 1;
    selectedScores: Score[] = [];
    selectedAminities: Amenities[] = [];
    searchedCityInUrl: string = '';
    resortLoading: boolean = false;
    error: boolean = false;
    singleResort: singleResort = {} as singleResort;
    cityMeta: CityMeta = {} as CityMeta;
    selectedMinPrice: number = 0;
	selectedMaxPrice: number = 10000000;
    minPrice: number = 0;
    maxPrice: number = Math.max();
    selectedTypes: ResortType[] = [];
    pricePerDate: Array<pricePerDate> = [];
    similarResorts: Array<object> = [];
}
