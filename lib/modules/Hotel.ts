import { Module } from 'vuex-module-accessor';
import Axios from 'axios';
import Vue from 'vue';
import { HotelSearchApi, CityListApi, HotelNameListApi, ReportApi, TopDestinationApi, TopCitiesApi, SpecialOfferApi, RoomPriceApi, HotelApi, UserApi } from '~/lib/hotel-service/index';
import { Amenities } from './Types/resort';
class TopDestinaion {
	Result: Array<Object> = []
	Hotels: Array<Object> = []
}
class hotelType {
	Id: number = 0;
	Name: string = ' '
	Stars: number = 0
	FullName: string = ' '
	NameEn: string = ' '
}
class CategoryObj {
	Name: string = '';
	Id: number = 0;
}
class hotelObj {
	Id: number = 0 ;
	NameFa: string = ' ' ;
	NameEn: string = ' ' ;
	AddressSummary: string = ' ' ;
	HotelImage: Array<Object> = [] ;
	HotelType: hotelType = { Id: 0, Name: '', Stars: 0, NameEn: '', FullName: '' } ;
	MinPrice: number = 0 ;
	Latitude: string = ' ' ;
	Longitude: string = '' ;
	Amenities: Array<string> = [] ;
	MapImage: string = ' ' ;
	MetaKeyword: string = ' ';
	MetaDescription: string = ' ' ;
	CommentsCount: number = 0;
	AverageRate: number = 0 ;
	Regions: string = '' ;
	CheaperSeller: Object = {} ;
	RoomCapacitySummary: Array<Object> = [] ;
	ImportantPlace: Object = {} ;
	Categories: Array<CategoryObj> = [] ;
	RateLevel: Object = {} ;
	Keyword: string = ' ' ;
	Title: string = ' ' ;
	Description: string= ' ' ;
	MinPriceCapacity: number = 0;
	RadarOfferRate: number = 0;
	MostDiscounted: number = 0;
	details: any = {};
	roomPrices: Object = {};
}
class CityList {
	list: Array<Object> = [];
	tag: string = ''
	title: string = ''
}

class DestinationCount {
	CityNameEn: string = ''
	CityNameFa: string = ''
	HotelsCount: number = 0
}
class MetaData {
	Amenities: Array<Object> = []
	HotelTypes: Array<Object> = []
	MaxPrice: number = 0
	MinPrice: number = 0
}
class HotelModuleState {
	checkInDate: string = '';
	checkOutDate: string = '';
	currencyCode: string = '';
	hotelType: string = '';
	cityName: string = '';
	hotelCategory: string = '';
	cityHotels: Array<hotelObj> = [];
	error: Boolean = false;
	loaded: Boolean = false;
	metaData: MetaData = {
		Amenities: [],
		HotelTypes: [],
		MinPrice: 0,
		MaxPrice: 0
	}

	minPrice: number = 0;
	maxPrice: number = 10000000;
	selectedMinPrice: number = 0;
	selectedMaxPrice: number = Math.max();
	selectedHoteltype: Array<string> = [];
	selectedAmenities : Array<string> = [];
	selectedHotelScore: Array<Object> = [];
	filterdHotel: hotelObj[] = [];
	sortType: string = 'RadarOfferRate';
	order: number = 1;
	filterType: string = '';
	cities: Array<CityList> = [];
	hotelNameList: Array<Object> = [];
	selectedCategories: Array<string> = [];
	mashhadHotelCount: number = 0;
	tehranHotelCount: number = 0;
	kishHotelCount: number = 0;
	shirazHotelCount: number = 0;
	capacity: number = 0;
	specialOffer: Array<Object> = []
	singleHotelRoomPrice: Array<Object> = []
	topDestinaionCount: Array<DestinationCount> = []
	duration: number = 1
	topDestinations : TopDestinaion = {
		Result: [],
		Hotels: []
	}

	radarInfo: Object = {};
	similarHotels: Array<object> = [];
	hotelComments: Array<object> = [];
	totalCommentsPage: number = 0
	totalCommentsCount: number = 0;
	singleHotelImage: Array<object> = [];
	singleHotelMeta: any = {}
}
export default class HotelModule extends Module<HotelModuleState> {
	/**
	 * Creates an instance of HotelModule
	 *
	 * @memberof HotelModule
	 */
	constructor() {
		super(HotelModuleState);
	}

	/**
	 * mutations
	 */

	/**
     * set searchOptions => city, checkInDate, checkOutDate, capacity, currency
     * @param { any } payload
     * @memberof ResortModule
     */
	set searchOption(payload: any) {
		this.state.cityName = payload.cityName;
		this.state.checkInDate = payload.checkInDate;
		this.state.checkOutDate = payload.checkOutDate;
		this.state.currencyCode = payload.currencyCode;
		this.state.capacity = payload.capacity;
	}

	/**
     * set all hotels in city
     * @param { hotelObj[] } cityHotels
     * @memberof ResortModule
     */
	set cityHotels(cityHotels: hotelObj[]) {
		this.state.cityHotels = cityHotels;
	}

	/**
     * set filterd hotels
     * @param { hotelObj[] } cityHotels
     * @memberof ResortModule
     */
	set filteredHotel(cityHotels: hotelObj[]) {
		this.state.filterdHotel = cityHotels;
	}

	/**
     * set error
     * @param { Boolean } error
     * @memberof ResortModule
     */
	set error(error: Boolean) {
		this.state.error = error;
	}

	/**
     * set loaded(if hotels request finished)
     * @param { Boolean } loaded
     * @memberof ResortModule
     */
	set loaded(loaded: Boolean) {
		this.state.loaded = loaded;
	}

	/**
     * set metaData for city
     * @param { MetaData } metaData
     * @memberof ResortModule
     */
	set metaData(metaData: MetaData) {
		this.state.metaData = metaData;
	}

	/**
     * set selected hotel types
     * @param { Array<string> } hotelType
     * @memberof ResortModule
     */
	set updateHotelType(hotelType: Array<string>) {
		this.state.selectedHoteltype = hotelType;
	}

	/**
     * set selected amenities
     * @param { Array<string> } hotelAmenities
     * @memberof ResortModule
     */
	set updateAmenities(hotelAmenities: Array<string>) {
		this.state.selectedAmenities = hotelAmenities;
	}

	/**
     * set selected prices
     * @param { Array<number> } payload
     * @memberof ResortModule
     */
	set updatePriceSlider(payload: Array<number>) {
		this.state.selectedMinPrice = payload[0];
		this.state.selectedMaxPrice = payload[1];
	}

	/**
     * set base prices came from meta request
     * @param { Array<number> } payload
     * @memberof ResortModule
     */
	set metaPrices(payload: Array<number>) {
        this.state.minPrice = payload[0];
        this.state.maxPrice = payload[1];
	}

	/**
     * set selected hotel scores
     * @param { Array<Object> } payload
     * @memberof ResortModule
     */
	set updateHotelScore(payload: Array<Object>) {
		this.state.selectedHotelScore = payload;
	}

	set filterType(payload:string) {
		this.state.filterType = payload;
	}

	/**
     * set selected categories in serach badge
     * @param { Array<string> } payload
     * @memberof ResortModule
     */
	set selectedCategories(payload: string) {
		if (this.state.selectedCategories.includes(payload)) {
			this.state.selectedCategories.splice(this.state.selectedCategories.indexOf(payload), 1);
		} else {
			this.state.selectedCategories.push(payload);
		}
	}

	/**
     * set top destination count
     * @param { Array<DestinationCount> } payload
     * @memberof ResortModule
     */
	set topDestinaionCount(payload: Array<DestinationCount>) {
		this.state.topDestinaionCount = payload;
	}

	set sortType(sortType: string) {
		this.state.sortType = sortType;
	}

	set order(order: number) {
		this.state.order = order;
	}

	get cityHotels(): hotelObj[] {
		return this.state.cityHotels;
	}

	/**
     * sort hotels based on sort type and order
     * @param { string } type
	 * @param { number } order
     * @memberof ResortModule
     */
	set sortHotel(payload: {type: string, order: number}) {
		this.state.sortType = payload.type;
		this.state.order = payload.order;
		switch (payload.type) {
			case 'RadarOfferRate' :
				this.state.cityHotels.sort(function (a: hotelObj, b: hotelObj) {
					const result = (a.RadarOfferRate > b.RadarOfferRate) ? -1 : (a.RadarOfferRate < b.RadarOfferRate) ? 1 : 0;
					return result * payload.order;
				});
				break;
			case 'MostDiscounted':
				this.state.cityHotels.sort(function (a: hotelObj, b: hotelObj) {
					const result = (a.MostDiscounted > b.MostDiscounted) ? -1 : (a.MostDiscounted < b.MostDiscounted) ? 1 : 0;
					return result * payload.order;
				});
				break;
			case 'AverageRate':
				this.state.cityHotels.sort(function (a: hotelObj, b: hotelObj) {
					const result = (a.AverageRate > b.AverageRate) ? -1 : (a.AverageRate < b.AverageRate) ? 1 : 0;
					return result * payload.order;
				});
				break;
			case 'CommentsCount':
				this.state.cityHotels.sort(function (a: hotelObj, b: hotelObj) {
					const result = (a.CommentsCount > b.CommentsCount) ? -1 : (a.CommentsCount < b.CommentsCount) ? 1 : 0;
					return result * payload.order;
				});
				break;
			case 'MinPrice':
				this.state.cityHotels.sort(function (a: hotelObj, b: hotelObj) {
					const result = (a.MinPrice > b.MinPrice) ? -1 : (a.MinPrice < b.MinPrice) ? 1 : 0;
					return result * payload.order;
				});
				break;
		}
	}

	/**
     * set list of all cities - use in serachbox
     * @param { Array<CityList> } cityList
     * @memberof ResortModule
     */
	set cities(cityList: Array<CityList>) {
		this.state.cities = cityList;
	}

	/**
     * set list of all hotels - use in searchbox
     * @param { Array<Object> } hotelsList
     * @memberof ResortModule
     */
	set hotelNameList(hotelsList: Array<Object>) {
		this.state.hotelNameList = hotelsList;
	}

	/**
     * set radar information
     * @param { Object } radarInfo
     * @memberof ResortModule
     */
	set radarInfo(radarInfo: Object) {
		this.state.radarInfo = radarInfo;
	}

	/**
     * set top destinationCount
     * @param { Array<Object> } hotelType
     * @memberof ResortModule
     */
	set topDestinations(payload: Array<Object>) {
		const result : any = payload;
		result.forEach((res: any) => {
			res.cheapestSingleBed = res.Hotels.filter((item: any) => item.SingleBedRoom != null).sort((a: any, b: any) => a.SingleBedRoom != null && (a.SingleBedRoom.Price.TotalPrice - b.SingleBedRoom.Price.TotalPrice));
			res.cheapestDoubleBed = res.Hotels.filter((item: any) => item.DoubleBedRoom != null).sort((a: any, b: any) => a.DoubleBedRoom != null && (a.DoubleBedRoom.Price.TotalPrice - b.DoubleBedRoom.Price.TotalPrice));
		});
		this.state.topDestinations.Result = result;
	}

	set mashhadHotelCount(payload: number) {
		this.state.mashhadHotelCount = payload;
	}

	set tehranHotelCount(payload: number) {
		this.state.tehranHotelCount = payload;
	}

	set kishHotelCount(payload: number) {
		this.state.kishHotelCount = payload;
	}

	set shirazHotelCount(payload: number) {
		this.state.shirazHotelCount = payload;
	}

	/**
     * set special's hotels list
     * @param { Array<Object> } payload
     * @memberof ResortModule
     */
	set specialOfferList(payload: Array<Object>) {
		this.state.specialOffer = payload;
	}

	set singleHotelRoomPrice(payload: Array<Object>) {
		this.state.singleHotelRoomPrice = payload;
	}

	/**
     * set serached duration
     * @param { number } payload
     * @memberof ResortModule
     */
	set duration(payload: number) {
		this.state.duration = payload;
	}

	/**
     * set single hotel meta and prices 
     * @param { number } id
	 * @param { Object } meta
	 * @param { Object } price
     * @memberof ResortModule
     */
	set hotelMetaAndPrice(payload: {id: number, meta: Object, price: Object, comments: object}) {
		const hotel = this.state.cityHotels.find((hotel: hotelObj) => hotel.Id === payload.id);
		if (hotel) {
			hotel.details = payload.meta;
			hotel.roomPrices = payload.price;
			Vue.set(hotel.details , 'Comments', payload.comments);
		}
	}

	set similarHotels(payload: Array<object>) {
		this.state.similarHotels = payload;
	}

	set hotelComments(payload: Array<object>) {
		this.state.hotelComments.push(...payload);
	}

	set totalCommentsPage(payload: number) {
		this.state.totalCommentsPage = payload;
	}

	set totalCommentsCount(payload: number) {
		this.state.totalCommentsCount = payload;
	}

	set addMoreCommentsInCityPage(payload: {comments: any, hotelId: number}) {
		const hotel = this.state.cityHotels.find((hotel: hotelObj) => hotel.Id === payload.hotelId);
		if (hotel) {
			hotel.details.Comments.Items.push(...payload.comments.Items);
		}
	}

	set singleHotelMoreImage(payload: Array<object>) {
		this.state.singleHotelMeta.Images.push(...payload);
	}

	set singleHotelMeta(payload: object) {
		this.state.singleHotelMeta = payload
	}

	/**
	 * getters
	 */

	/**
     * get filterType from route incuded type or tag pages
     * @memberof ResortModule
     */
	get filter() {
		if (this.state.filterType) {
			if (this.state.filterType.substring(0, 4) === 'type') {
				return this.state.filterType.substring(5);
			} else if (this.state.filterType.substring(0, 3) === 'tag') {
				return this.state.filterType.substring(4).replace(/-/g, ' ');
			} else {
				return this.state.filterType.toLowerCase().replace(/-/g, ' ');
			}
		} else {
			return '';
		}
	}

	/**
     * make categories list
     * @memberof ResortModule
     */
	get categoriesList() {
		let arr: Array<string> = [];
		for (let i = 0; i < this.state.filterdHotel.length; i++) {
			this.state.filterdHotel[i].Categories.map((item: { Name: string }) => {
				if (!arr.includes(item.Name)) {
					arr.push(item.Name);
				}
			});
		}
		return arr.map((item) => item);
	}

	get topDestinationsResult() {
		return this.state.topDestinations.Result;
	}

	get tehranHotelCount() {
		const result = this.state.topDestinaionCount.find(el => el.CityNameEn === 'Tehran');
		if (result) {
			return result.HotelsCount;
		} else return 0;
	}

	get mashhadHotelCount() {
		const result = this.state.topDestinaionCount.find((el: DestinationCount) => el.CityNameEn === 'Mashhad');
		if (result) {
			return result.HotelsCount;
		} else return 0;
	}

	get kishHotelCount() {
		const result = this.state.topDestinaionCount.find((el: DestinationCount) => el.CityNameEn === 'Kish');
		if (result) {
			return result.HotelsCount;
		} else return 0;
	}

	get shirazHotelCount() {
		const result = this.state.topDestinaionCount.find((el: DestinationCount) => el.CityNameEn === 'Shiraz');
		if (result) {
			return result.HotelsCount;
		} else return 0;
	}

	get allCities() {
		return this.state.cities[0].list.concat(this.state.cities[1].list);
	}

	get hotelCountArray() {
		const min = this.state.metaData.MinPrice / this.state.duration;
		const max = this.state.metaData.MaxPrice / this.state.duration;
		const duration = (max - min) / 20;
		let start = min;
		const arr = [];
		for (let i = 1; i < 21; i++) {
			let count = 0;
			for (let j = 0; j < this.state.filterdHotel.length; j++) {
				if (start <= this.state.filterdHotel[j].MinPrice / this.state.duration && start + duration >= this.state.filterdHotel[j].MinPrice / this.state.duration) {
					count += 1;
				}
			}
			arr.push({ start, end: min + (duration * i), count });
			start = min + (duration * i);
		}
		return arr;
	}
	/**
	 * actions
	 */

	/**
	 * Get hotels for special city
	 *
	 * @memberof HotelModule
	 * @param {string} cityName
	 * @param {string} checkInDate
	 * @param {string} checkOutDate
	 * @param {string} hotelCategory
	 * @param {string} hotelType
	 * @param {number} capacity
	 */
	hotelSearch(payload: { cityName: string, checkInDate: string, checkOutDate: string, hotelCategory: string, hotelType: string, capacity: number }) {
		this.loaded = false;
		this.searchOption = { cityName: payload.cityName, checkInDate: payload.checkInDate, checkOutDate: payload.checkOutDate, capacity: payload.capacity };
		Axios.post(process.env.VUE_APP_HOTEL_BASE + '/api/HotelSearch', {
			CityName: payload.cityName,
			CheckInDate: payload.checkInDate,
			CheckOutDate: payload.checkOutDate,
			Capacity: payload.capacity,
			...(payload.hotelType ? { HotelType: payload.hotelType } : {}),
			...(payload.hotelCategory ? { Category: payload.hotelCategory } : {}),
			CurrencyCode: 'IRT',
			WidthSize: 240,
			HeightSize: 180
		}, { headers: { 'api-version': '1.2' } })
			.then((res: any) => {
				this.loaded = true;
				this.error = false;
				this.cityHotels = res.data.Result.Hotels.map((obj: hotelObj) => ({ ...obj, details: null, roomPrices: null }));
				this.filteredHotel = res.data.Result.Hotels.map((obj: hotelObj) => ({ ...obj, details: null, roomPrices: null }));
				this.metaData = res.data.Result.MetaData;
				this.sortHotel={ type: 'RadarOfferRate', order: 1}
				if (res.data.Result.MetaData.MinPrice && res.data.Result.MetaData.MaxPrice) {
					const priceSlider = [res.data.Result.MetaData.MinPrice, res.data.Result.MetaData.MaxPrice];
					this.metaPrices = priceSlider;
				}
				if (res.data.Result.MetaData.Types.length) {
					if (payload.hotelType) {
						this.updateHotelType = [payload.hotelType];
					}
				}
			}).catch((e) => {
				this.error = true;
				this.loaded = false;
			});
	}

	/**
	 * Filter hotels list
	 *
	 * @memberof HotelModule
	 */
	filterHotels() {
		const newArray = [];
		for (let i = 0; i < this.state.filterdHotel.length; i++) {
			const filtered =
				(this.state.selectedMinPrice > this.state.filterdHotel[i].MinPrice / this.state.duration) ||
				(this.state.selectedMaxPrice < this.state.filterdHotel[i].MinPrice / this.state.duration) ||
				(this.state.selectedHoteltype.length && this.state.filterdHotel[i] && this.state.filterdHotel[i].HotelType && this.state.selectedHoteltype.indexOf(this.state.filterdHotel[i].HotelType.NameEn) === -1) ||
				(this.state.filterdHotel.length > 0 && this.state.selectedAmenities.some(amenity => !this.state.filterdHotel[i].Amenities.map((res: any) => res.Title).includes(amenity))) ||
				(this.state.selectedCategories.some((item: string) => !this.state.filterdHotel[i].Categories.some(e => e.Name === item))) ||
				(this.state.selectedHotelScore.length && !this.state.selectedHotelScore.some((item: any) => ((item.max > this.state.filterdHotel[i].AverageRate && item.min < this.state.filterdHotel[i].AverageRate) || item.max === this.state.filterdHotel[i].AverageRate)));
			if (!filtered) newArray.push(this.state.filterdHotel[i]);
		}
		this.cityHotels = newArray;
		const type = this.state.sortType;
		const order = this.state.order;
		this.sortHotel = { type, order };
	}

	/**
	 * load cities list
	 *
	 * @memberof HotelModule
	 * @param {number} ResidenceCity
	 */
	async loadCities(payload: {ResidenceCity: number}) {
		const res: any = await new CityListApi().apiCityListGet(payload.ResidenceCity);
		const data = res.data;
		const list = data.Result;
		const popCities = [];
		const regCities = [];
		for (let i = 0; i < list.length; i++) {
			if (list[i].ProvinceTitle == null) {
				list.Title = list.ProvinceTitle;
			} else {
				list.Title = list[i].ProvinceTitle.replace(/ي/g, 'ی');
			}
		}
		for (let i = 0; i < list.length; i++) {
			if (list[i].Popular) {
				popCities.push({
					id: list[i].NameEn,
					label: list[i].CityTitle,
					latitude: list[i].Latitude,
					longitude: list[i].Longitude,
					province: list[i].ProvinceTitle,
					footer: list[i].Footer
				});
			} else if (list[i].NameEn != null) {
				regCities.push({
					id: list[i].NameEn,
					label: list[i].CityTitle,
					latitude: list[i].Latitude,
					longitude: list[i].Longitude,
					province: list[i].ProvinceTitle,
					footer: list[i].Footer
				});
			}
		}
		this.cities = [{
			title: 'city',
			list: popCities,
			tag: 'popularCity'
		},
		{
			title: 'city',
			list: regCities,
			tag: 'city'
		}];
	}

	/**
	 * load Hotels list
	 *
	 * @memberof HotelModule
	 */
	async loadHotelNameList() {
		const res: any = await new HotelNameListApi().apiHotelNameListGet();
		const data = res.data;
		const list = [];
		if (data.Result != null) {
			for (let i = 0; i < data.Result.length; i++) {
				if (
					data.Result[i].CityNameEn != null &&
				data.Result[i].CityNameFa != null &&
				data.Result[i].NameEn != null &&
				data.Result[i].NameFa != null
				) {
					list.push({
						id: data.Result[i].CityNameEn + '/' + data.Result[i].NameEn,
						label: data.Result[i].NameFa + ' ' + data.Result[i].CityNameFa,
						listLabel: data.Result[i].NameFa,
						cityName: data.Result[i].CityNameFa,
						province: data.Result[i].ProvinceNameFa,
						footer: data.Result[i].Footer,
						type: 'Hotel'
					});
				}
			}
			this.hotelNameList = [{
				title: 'hotel',
				list: list,
				tag: 'hotel'
			}];
		}
	}

	/**
	 * Load radar info
	 *
	 * @memberof HotelModule
	 */
	loadRadarInfo() {
		return new Promise((resolve, reject) => {
			new ReportApi().apiReportSimpleGet().then((res: any) => {
				this.radarInfo = res.data.Result;
				resolve(res);
			}).catch(err => reject(console.log(3456)));
		});
	}

	/**
	 * Top destination request that in main page
	 *
	 * @memberof HotelModule
	 */
	getTopDestinations() {
		if (this.state.topDestinations && (this.state.topDestinations.Result.length === 0)) {
			return new Promise((resolve, reject) => {
				new TopDestinationApi().apiTopDestinationHotelsGet('IRT').then((res: any) => {
					this.topDestinations = res.data.Result;
					resolve(res);
				}).catch(err => reject(err));
			});
		}
	}

	/**
	 * Vote to radar
	 *
	 * @memberof HotelModule
	 * @param {number} id
	 * @param {number} voteId
	 */
	async sendUserVote(payload: {Id: number, voteId: number}) {
		const res = await new UserApi().apiUserByUserIdSatisfactionBySatisfactionValuePost(payload.Id, payload.voteId);
		return res;
	}

	/**
	 * Top destination's count request that in main page
	 *
	 * @memberof HotelModule
	 */
	getTopDestinaionCount() {
		if (this.state.topDestinaionCount.length === 0) {
			return new Promise((resolve, reject) => {
				new TopCitiesApi().apiTopCitiesHotelsGet().then((res: any) => {
					this.topDestinaionCount = res.data.Result;
					resolve(res);
				}).catch(err => reject(err));
			});
		}
	}

	/**
	 * Special's offer request that in main page
	 *
	 * @memberof HotelModule
	 */
	getSpecialOffer() {
		if (this.state.specialOffer.length === 0) {
			return new Promise((resolve, reject) => {
				console.log('special offer');
				new SpecialOfferApi().apiSpecialOfferGetAllGet().then((res: any) => {
					this.specialOfferList = res.data.Result;
					resolve(res);
				}).catch(err => reject(err));
			});
		}
	}

	/**
	 * Get Hotel's Meta
	 *
	 * @memberof HotelModule
	 * @param {string} cityName
	 * @param {string} hotelName
	 */
	async getHotelMeta(payload: {cityName: string, hotelName: string}) {
		const res = await new HotelApi().apiHotelsAdminGetHotelsMetaGet(undefined, payload.cityName, payload.hotelName);
		return res;
	}

	/**
	 * get Hotel's comment
	 *
	 * @memberof HotelModule
	 * @param {string} hotelName
	 * @param {string} cityName
	 * @param {number} page
	 * @param {number} size
	 */
	async getHotelComments(payload: {hotelName: string, cityName: string, page: number, size: number}) {
		const res = new HotelApi().apiHotelCommentsGet(payload.hotelName, payload.cityName, payload.page, payload.size);
		return res;
	}


	/**
	 * get Hotel's comment
	 *
	 * @memberof HotelModule
	 * @param {string} hotelName
	 * @param {string} cityName
	 * @param {number} page
	 * @param {number} size
	 */
	async loadMoreHotelComments(payload: {hotelName: string, cityName: string, page: number, size: number, hotelId: number}) {
		new HotelApi().apiHotelCommentsGet(payload.hotelName, payload.cityName, payload.page, payload.size).then((res: any) => {
			this.addMoreCommentsInCityPage = {hotelId: payload.hotelId, comments: res.data};
		})
	}

	/**
	 * Get Hotel's prices
	 *
	 * @memberof HotelModule
	 * @param {string} cityName
	 * @param {string} hotelName
	 * @param {string} checkInDate
	 * @param {string} checkOutDate
	 */
	async getHotelPrice(payload: {cityName: string, hotelName: string, checkInDate: string, checkOutDate: string}) {
		const res = await new RoomPriceApi().apiRoomTypePriceGet(undefined, payload.cityName, payload.hotelName, payload.checkInDate, payload.checkOutDate, 'IRT');
		return res;
	}

	/**
	 * Get Hotel'mate and prices promis
	 *
	 * @memberof HotelModule
	 * @param {number} hotelId
	 * @param {string} cityName
	 * @param {string} hotelName
	 * @param {string} checkInDate
	 * @param {string} checkOutDate
	 */
	getHotelMetaAndPrice(payload: {hotelId: number, cityName: string, hotelName: string, checkInDate: string, checkOutDate: string}) {
		const metaRequest = this.getHotelMeta({ cityName: payload.cityName, hotelName: payload.hotelName });
		const priceRequest = this.getHotelPrice({ cityName: payload.cityName, hotelName: payload.hotelName, checkInDate: payload.checkInDate, checkOutDate: payload.checkOutDate });
		const commnetRequest = this.getHotelComments({ hotelName: payload.hotelName, cityName: payload.cityName, page: 1, size: 6})
		Axios.all([metaRequest, priceRequest, commnetRequest]).then(Axios.spread((...responses: any) => {
			this.hotelMetaAndPrice = { id: payload.hotelId, meta: responses[0].data.Result[0], price: responses[1].data.RoomTypes, comments: responses[2].data };
		}));
	}

	/**
	 * Get Main page all requests
	 *
	 * @memberof HotelModule
	 */
	async getAllMainPageRequest() {
		const specialOffer = this.getSpecialOffer();
		const radarInfo = this.loadRadarInfo();
		const topDestinaionCount = this.getTopDestinaionCount();
		await this.getTopDestinations();
		const topDestination = this.topDestinationsResult;
		return Promise.all([radarInfo, topDestinaionCount, specialOffer, topDestination]);
	}

	/**
	 * Get special Hotels'room prices
	 *
	 * @memberof HotelModule
	 * @param {string} cityName
	 * @param {string} hotelName
	 * @param {string} checkInDate
	 * @param {string} checkOutDate
	 */
	async getSingleHotelRoomPrice(payload: {cityName: string, hotelName: string, CheckInDate: string, CheckOutDate: string, capacity: number }) {
		const res: any = await new RoomPriceApi().apiRoomTypePriceGet(undefined, payload.cityName, payload.hotelName, payload.CheckInDate, payload.CheckOutDate, 'IRT', undefined, payload.capacity);
		this.singleHotelRoomPrice = res.data;
	}

	/**
	 * Get special Hotels'similar hotels
	 *
	 * @memberof HotelModule
	 * @param {object} params
	 */
	getSimilarHotels(payload: object) {
		new HotelApi().apiHotelsSimilarPost(3, undefined, undefined, undefined, payload).then((res: any) => {
			this.similarHotels = res.data.Result;
		});
	}


	/**
	 * set selected types in filter and change route
	 *
	 * @memberof HotelModule
	 * @param {string[]} types
	 */
	selectedTypesFilter(types: string[]) {
        this.updateHotelType = types;
        this.context.store?.$router.push({ path: this.context.store.$router.app.$options.router?.currentRoute.fullPath, query: { Types: this.state.selectedHoteltype.join(',') } });
	}

	/**
	 * set selected aminities in filter and change route
	 *
	 * @memberof HotelModule
	 * @param {string[]} amenities
	 */
	selectedAminitiesFilter(amenities: string[]) {
		this.updateAmenities = amenities;
		this.context.store?.$router.push({ path: this.context.store.$router.app.$options.router?.currentRoute.fullPath, query: { Aminities: this.state.selectedAmenities.join(',') } });
	}

	/**
	 * set selected scores in filter and change route
	 *
	 * @memberof HotelModule
	 * @param {object[]} scores
	 */
	selectedScoresFilter(scores: object[]) {
		this.updateHotelScore = scores;
		const arr = scores.map((i: any) => i.Name);
		if (arr.length) {
			this.context.store?.$router.push({ path: this.context.store.$router.app.$options.router?.currentRoute.fullPath, query: { Scores: arr.join(',') } });
		}
	}

	/**
	 * set price range in filter and change route
	 *
	 * @memberof HotelModule
	 * @param {number[]} scores
	 */
	selectedPricesFilter(payload: Array<number>) {
		this.updatePriceSlider = payload;
		if (payload[0] && payload[1]) {
            this.context.store?.$router.push({ path: this.context.store.$router.app.$options.router?.currentRoute.fullPath, query: { selectedMinPrice: payload[0].toString(), selectedMaxPrice: payload[1].toString() } });
        }
	}

	/**
	 * get single hotel comments request with pagination
	 *
	 * @memberof HotelModule
	 * @param {string} hotel
	 * @param {string} city
	 * @param {number} page
	 * @param {number} size
	 */
	getSingleHotelComments(payload: { hotel: string, city: string, page: number, size: number }) {
		new HotelApi().apiHotelCommentsGet(payload.hotel, payload.city, payload.page, payload.size).then((res: any) => {
			this.hotelComments = res.data.Items;
			this.totalCommentsPage = res.data.TotalPages;
			this.totalCommentsCount = res.data.TotalCount;
		})
	}

	/**
	 * get single hotel images with pagination
	 *
	 * @memberof HotelModule
	 * @param {string} hotelName
	 * @param {string} cityName
	 * @param {number} page
	 * @param {number} size
	 */
	getSingleHotelImages(payload: {hotelName: string, cityName: string, page: number, size: number}) {
		new HotelApi().apiHotelImagesGet(payload.hotelName, payload.cityName, payload.page, payload.size).then((res: any) => {
			this.singleHotelMoreImage = res.data.Items;
		})
	}
	/**
	 * get single hotel images with pagination
	 *
	 * @memberof HotelModule
	 * @param {string} hotelName
	 * @param {string} cityName
	 * @param {number} page
	 * @param {number} size
	 */
	async getSingleHotelMeta(payload: {hotelName: string, cityName: string}) {
		try {
			let res = await Axios.get(process.env.VUE_APP_HOTEL_BASE + `/api/HotelsAdmin/GetHotels/meta?CityNameEn=${payload.cityName}&&HotelNameEn=${payload.hotelName}`)
			this.singleHotelMeta = res.data.Result[0];
		}
		catch(err) {
			throw new Error(err.response.status);
		}
	}

}
