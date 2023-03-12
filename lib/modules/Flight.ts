import Axios from 'axios';
import { Module} from 'vuex-module-accessor';
const airports = require('../../airport.json');
import { AirlinesType, CabinClassesType, AircraftTypesType } from './Types/flight';
export default class FlightModule extends Module<FlightModuleState> {
	/**
	 * Creates an instance of FlightModule
	 *
	 * @memberof FlightModule
	 */
	constructor() {
		super(FlightModuleState);
	}

	set searchOption(payload: { origin: string, destination: string, date: string }) {
		this.state.origin = payload.origin;
		this.state.destination = payload.destination;
		this.state.date = payload.date;
	}

	set flights(filghts: flightsObj[]) {
		this.state.flights = filghts;
	}

	set filteredFlights(filteredFlights: flightsObj[]) {
		this.state.filteredFlights = filteredFlights;
	}

	set metaData(meta: Object) {
		this.state.metaData = meta;
	}

	set AircraftTypes(AircraftTypes: Array<AircraftTypesType>) {
		this.state.AircraftTypes = AircraftTypes;
	}

	set selectedAircraftTypes(payload: Array<string>) {
		this.state.selectedAircraftTypes = payload;
	}

	set Airlines(Airlines: Array<AirlinesType>) {
		this.state.Airlines = Airlines;
	}

	set CabinClasses(CabinClasses: Array<CabinClassesType>) {
		this.state.CabinClasses = CabinClasses;
	}

	set selectedCabinClass(payload: Array<string>) {
		this.state.selectedCabinClass = payload;
	}

	set updateTimeSlider(payload: Array<number>) {
		this.state.minTime = payload[0];
		this.state.maxTime = payload[1];
	}

	set selectedAirlines(payload: Array<string>) {
		this.state.selectedAirlines = payload;
	}

	set minTimeLable(payload: string) {
		this.state.minTimeLable = payload;
	}

	set maxTimeLable(payload: string) {
		this.state.maxTimeLable = payload;
	}

	set loaded(payload: boolean) {
		this.state.loaded = payload;
	}

	set cities(payload: Array<Object>) {
		this.state.cities = payload;
	}

	set imageContent(payload: Array<string>) {
		this.state.flightContent.wpImage = payload;
	}

	set tagsContent(payload: Array<string>) {
		this.state.flightContent.wpTags = payload;
	}

	set tagsNameContent(payload: Array<string>) {
		this.state.flightContent.wpTagsName = payload;
	}

	set content(payload: any) {
		this.state.flightContent.wpContent = payload.content.rendered;
		this.state.flightContent.wpTitle = payload.title.rendered;
		this.state.flightContent.wpDesc = payload.yoast_meta.yoast_wpseo_metadesc,
		this.state.flightContent.wpCustomTitle = payload.yoast_meta.yoast_wpseo_title;
	}

	set errorContent(error: boolean) {
		this.state.flightContent.error = error;
	}

	set flightFooter(payload: string) {
		this.state.flightFooter = payload
	}

	set flightFaq(payload: Array<object>) {
		this.state.flightFaq = payload
	}

	set sortFlight(payload: {type: string, order: number}) {
		this.state.sortType = payload.type;
		this.state.order = payload.order;
		switch (payload.type) {
			case 'cheapest' :
				this.state.filteredFlights.sort(function (a: flightsObj, b: flightsObj) {
					const result = (a.Classes.Economy[0].Price < b.Classes.Economy[0].Price) ? -1 : (a.Classes.Economy[0].Price > b.Classes.Economy[0].Price) ? 1 : 0;
					return result * payload.order;
				});
				break;
			case 'closets':
				this.state.filteredFlights.sort(function (a: flightsObj, b: flightsObj) {
					const result = (new Date(a.Flight.DepartureTime) < new Date(b.Flight.DepartureTime.replace(/-/g, '/'))) ? -1 : (new Date(a.Flight.DepartureTime.replace(/-/g, '/')) > new Date(b.Flight.DepartureTime.replace(/-/g, '/'))) ? 1 : 0;
					return result * payload.order;
				});
				break;
			case 'fastest':
				this.state.filteredFlights.sort(function (a: flightsObj, b: flightsObj) {
					const aDuration = (new Date(a.Flight.ArrivalTime)).getTime() - (new Date(a.Flight.DepartureTime)).getTime();
					const bDuration = (new Date(b.Flight.ArrivalTime)).getTime() - (new Date(b.Flight.DepartureTime)).getTime();
					const result = aDuration < bDuration ? -1 : aDuration > bDuration ? 1 : 0;
					return result * payload.order;
				});
				break;
			case 'radarOfferRate':
				this.state.filteredFlights.sort(function (a: flightsObj, b: flightsObj) {
					const aMinprice = Math.min.apply(null, a.Classes.Economy.map(function (item: any) {
						return item.Price;
					}));
					const bMinprice = Math.min.apply(null, b.Classes.Economy.map(function (item: any) {
						return item.Price;
					}));
					const aRate = ((new Date(a.Flight.ArrivalTime)).getTime() - (new Date(a.Flight.DepartureTime)).getTime()) * aMinprice / Math.log(a.Flight.AirlineRatings.Average);
					const bRate = ((new Date(b.Flight.ArrivalTime)).getTime() - (new Date(b.Flight.DepartureTime)).getTime()) * bMinprice / Math.log(b.Flight.AirlineRatings.Average);
					const result = aRate > bRate ? -1 : aRate < bRate ? 1 : 0;
					return result * payload.order;
				});
				break;
		}
	}

	get content() {
		return this.state.flightContent;
	}

	get formatedAirlines() {
		return this.state.Airlines.map(({ AirlineTitle: Name, ...rest }) => ({ Name, ...rest }));
	}

	get foramtedCabinClasses() {
		let arr = [];
		for(let i = 0; i < this.state.CabinClasses.length; i++) {
			if(this.state.CabinClasses[i].Class === 'Business') {
				arr[i] = { Name: 'بیزینس', ...this.state.CabinClasses[i] };
			} else {
				arr[i] = { Name: 'اکونومی', ...this.state.CabinClasses[i] };
			}
		}
		return arr;
	}

	get formatedAircraftTypes() {
		let arr = [];
		for(let i = 0; i < this.state.AircraftTypes.length; i++) {
			arr[i] = { Name: this.state.AircraftTypes[i].Title, ...this.state.AircraftTypes[i] };
		}
		return arr;
	}

	flightSearch(payload: { origin: string, destination: string, date: string}) {
		this.loaded = false;
		this.searchOption = { origin: payload.origin, destination: payload.destination, date: payload.date };
		Axios({ url: process.env.VUE_APP_FLIGHT_API + '/api/flights/' + payload.origin + '/' + payload.destination + '/' + payload.date + '/IRT', method: 'get', headers: { accept: 'application/vnd.radar361.v1.1+json' } }).then((response) => {
			this.loaded = true;
			this.flights = response.data.SearchResults;
			this.filteredFlights = this.state.flights.slice();
			this.AircraftTypes = response.data.Metadata.AircraftTypes;
			this.Airlines = response.data.Metadata.Airlines;
			this.CabinClasses = response.data.Metadata.CabinClasses;
			this.flightFooter = response.data.Metadata.Footer;
			this.flightFaq = response.data.Metadata.FrequentlyAskedQuestions;
			if (this.state.flights.length) { this.metaData = response.data.Metadata; };
		});
	}

	filterFlights() {
		const selectedAircraftTypes = this.state.selectedAircraftTypes.map((i: any) => {return i.Title})
		const newArray = [];
		for (let i = 0; i < this.state.flights.length; i++) {
			const depDate = this.state.flights[i].Flight.DepartureTime.substr(0, 10).replace(/-/g, '/');
			const depTime = new Date(this.state.flights[i].Flight.DepartureTime.replace(/-/g, '/'));
			const filtered =
                (this.state.selectedAirlines.length && !this.state.selectedAirlines.includes(this.state.flights[i].Flight.AirlineCode)) ||
                (selectedAircraftTypes.length && !selectedAircraftTypes.includes(this.state.flights[i].Flight.AircraftType)) ||
                !((new Date(depDate + ' ' + this.state.minTimeLable)).getTime() < depTime.getTime()) ||
                !((new Date(depDate + ' ' + this.state.maxTimeLable)).getTime() > depTime.getTime()) ||
                (this.state.selectedCabinClass.length && !(this.state.selectedCabinClass.includes('Economy') || this.state.flights[i].Classes.Economy.length == 0)) ||
                (this.state.selectedCabinClass.length && !(this.state.selectedCabinClass.includes('Business') || this.state.flights[i].Classes.Business.length == 0));
			if (!filtered) newArray.push(this.state.flights[i]);
		}
		this.filteredFlights = newArray;
		const type = this.state.sortType;
		const order = this.state.order;
		this.sortFlight = { type, order };
	}

	async loadFlightContent(payload: { slug: string }) {
		const res = await Axios.get('https://blog.radar361.com/wp-json/wp/v2/posts?slug=' + encodeURIComponent(payload.slug));
		if (res.status == 200) {
			if (res.data[0].better_featured_image != null) {
				this.imageContent = res.data[0].better_featured_image.source_url;
			} else {
				this.imageContent = ['../assets/images/notFound.png'];
			};
			if (res.data[0].tags.length != 0) {
				const tags = await Axios.get('https://blog.radar361.com/wp-json/wp/v2/tags?include=' + res.data[0].tags);
				if (res.status == 200) {
					this.tagsNameContent = tags.data[0].name;
					this.tagsContent = tags.data[0].name.replace(/\s/g, '،');
					this.content = res.data[0];
					this.errorContent = false;
				} else {
					this.errorContent = true;
				}
			}
		} else {
			this.errorContent = true;
		}
	}

	async loadCities() {
		const res = airports;
		const cities = airports;
		const regCities = [];
		const popCities = [];
		for (let i = 0; i < res.length; i++) {
			cities[i].CityTitle = (res[i].CityTitle).replace(/ي/g, 'ی');
		}
		for (let i = 0; i < cities.length; i++) {
			if (cities[i].Popular) {
				popCities.push({
					id: cities[i].CityCode,
					label: cities[i].CityTitle,
					latitude: cities[i].Latitude,
					longitude: cities[i].Longitude,
					CityCode: cities[i].CityCode
				});
			} else {
				regCities.push({
					id: cities[i].CityCode,
					label: cities[i].CityTitle,
					latitude: cities[i].Latitude,
					longitude: cities[i].Longitude,
					CityCode: cities[i].CityCode
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


	selectedAirlinesFilter(payload: AirlinesType[]) {
		const arr = payload.map((i: AirlinesType) => i.AirlineCode);
		this.selectedAirlines = arr;
		this.context.store?.$router.push({ path: this.context.store.$router.app.$options.router?.currentRoute.fullPath, query: { Airlines: arr.join(',') } });
	}

	selectedCabinClassesFilter(payload: CabinClassesType[]) {
		const arr = payload.map((i: CabinClassesType) => i.Class);
		this.selectedCabinClass = arr;
		this.context.store?.$router.push({ path: this.context.store.$router.app.$options.router?.currentRoute.fullPath, query: { CabinClass: arr.join(',') } });
	}

	selecteddAircraftTypes(payload: AircraftTypesType[]) {
		const arr = payload.map((i: AircraftTypesType) => i.Title);
		this.selectedAircraftTypes = arr;
		this.context.store?.$router.push({ path: this.context.store.$router.app.$options.router?.currentRoute.fullPath, query: { AircraftTypes: arr.join(',') } });
	}

	selectedTimeFilter(payload: Array<number>) {
		this.updateTimeSlider = payload;
		this.context.store?.$router.push({ path: this.context.store.$router.app.$options.router?.currentRoute.fullPath, query: { minTime: payload[0].toString(), maxTime: payload[1].toString() } });
		this.filterFlights();
	}
}
class AirlineRatingsObj {
    Average: number = 0
    Delay: number = 0;
    FleetAge: number = 0
}
class EconomyClass {
    BuyLink: string = ''
    Capacity: string = ''
    Class: string =''
    DirectSeller: boolean = false
    IsBusiness: boolean = false
    Price: number = 0
    SellTypeStr: string = ''
    SellerID: string = ''
    SellerLink: string = ''
    SellerLogo: string = ''
    SellerName: string = ''
    Type: number = 1
}
class classObj {
    Business: Array<Object> = []
    Economy: Array<EconomyClass> = []
}
class flightInfo {
    AirCraft: string = ''
    AircraftType: string = ''
    Airline: string = ''
    AirlineCode: string = ''
    AirlineLogo: string = ''
    AirlineRatings: AirlineRatingsObj = { Average: 0, Delay: 0, FleetAge: 0 }
    AirlineTitle: string = ''
    ArrivalTime: string = ''
    DepartureTime: string = ''
    Destination: string = ''
    DestinationIATACode: string = ''
    FlightNumber: string = ''
    HasStops: boolean = false
    JDepartureTime: string = ''
    Origin: string = ''
    OriginIATACode: string = ''
}
class flightsObj {
    Classes: classObj = { Business: [], Economy: [] };
    Flight: flightInfo = {
    	AirCraft: '',
    	AircraftType: '',
    	Airline: '',
    	AirlineCode: '',
    	AirlineLogo: '',
    	AirlineRatings: { Delay: 0, FleetAge: 9, Average: 0 },
    	AirlineTitle: '',
    	ArrivalTime: '',
    	DepartureTime: '',
    	Destination: '',
    	DestinationIATACode: '',
    	FlightNumber: '',
    	HasStops: false,
    	JDepartureTime: '',
    	Origin: '',
    	OriginIATACode: ''
    };

    RedirectTicket: string = '';
    Ticket: string = '';
    Token: string =''
}
class FlightContent {
    wpImage: Array<string> = [];
    wpTags: Array<Object> = [];
    wpTagsName: Array<string> = [];
    wpContent : string = '';
    wpTitle : string = '';
    wpDesc : string = '';
    wpCustomTitle : string = '';
    error: boolean = false;
    slug: string = '' ;
}
class FlightModuleState {
    origin: string = '';
    destination: string = '';
    date: string = '';
    flights: flightsObj[] = [];
    filteredFlights: flightsObj[] = [];
    metaData: Object = {};
    AircraftTypes: Array<AircraftTypesType> = [];
    Airlines: Array<AirlinesType> = []
    CabinClasses: Array<CabinClassesType> = [];
    minTime: number = 0;
    maxTime: number = 1440;
    selectedAirlines: Array<string> = [];
    selectedAircraftTypes: Array<string> = [];
    selectedCabinClass: Array<string> = [];
    minTimeLable: string = '00:00';
    maxTimeLable: string = '24:00';
    loaded: boolean = false;
    sortType: string = 'cheapest';
    order: number = 1;
    cities: Array<Object> = [];
    flightContent: FlightContent = {
    	wpImage: [],
    	wpTags: [],
    	wpTagsName: [],
    	wpContent: '',
    	wpTitle: '',
    	wpDesc: '',
    	wpCustomTitle: '',
    	error: false,
    	slug: ''
    }
	flightFooter: string = ''
	flightFaq: Array<object> = []
}
