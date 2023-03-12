<template>
  <div>
    <div v-if="loading" class="loading">
      <div class="loading-spinner" />
    </div>
    <slot name="schema" />
    <div class="single-hotel-desktop">
      <div class="w-100 single-hotel-search">
        <div class="custom-container single-hotel-search_container">
          <slot name="search" />
        </div>
      </div>
      <div class="custom-container">
        <div
          class="d-flex justify-content-between w-100 my-4 align-items-center"
        >
          <div class="d-flex flex-column">
            <slot name="breadcrumb" />
            <div class="hotel-title d-flex align-items-center">
              <h1 class="hotel-title__name mb-0">
                {{ hotelType.Name }} {{ nameFa }} {{ cityNameFa }}
              </h1>
              <div class="d-flex ml-1 mr-2">
                <font-awesome-icon
                  v-for="i in hotelType.Stars"
                  :key="i"
                  :icon="['fas', 'star']"
                  class="hotel-title__star fa-style"
                />
              </div>
              <p v-if="hotelType.Stars" class="mb-0 hotel-star">
                (
                <span v-if="hotelType.Stars === 5">پنج</span>
                <span v-if="hotelType.Stars === 4">چهار</span>
                <span v-if="hotelType.Stars === 3">سه</span>
                <span v-if="hotelType.Stars === 2">دو</span>
                <span v-if="hotelType.Stars === 1">یک</span>
                ستاره )
              </p>
            </div>
          </div>
          <div
            v-scroll-to="{ el: '#desktopComments', offset: -20 }"
            class="hotel-rate-comment d-flex"
          >
            <div
              class="
                hotel-rate-comment__comment
                d-flex
                flex-column
                align-items-center
                justify-content-center
              "
            >
              <div>
                <span>{{ commentsCount }}</span>
                نظر
              </div>
            </div>
            <div
              class="
                hotel-rate-comment__rate
                d-flex
                flex-column
                align-items-center
                justify-content-center
              "
            >
              <div>
                <span>10/</span> <span>{{ rateLevel }}</span>
              </div>
              {{ rateLevel.Caption }}
            </div>
          </div>
        </div>
        <div class="d-flex align-items-start">
          <div class="d-flex flex-column image-slider">
            <single-hotel-image-slider
              :images="images"
              :image-index="imageIndex"
              :name="'big-slider'"
              :hotel-type="hotelType.Name"
              :hotel-name-fa="nameFa"
              :city-name-fa="
                cityNameFa && cityNameFa[0] ? cityNameFa[0].label : ''
              "
            />
            <div class="hotel-image-list">
              <div class="d-flex flex-wrap" style="direction: rtl">
                <div
                  v-for="(image, index) in showAllImages
                    ? images
                    : images && images.length
                    ? images.slice(0, 20)
                    : []"
                  :key="index"
                  class="hotel-image-list__item"
                  @click="imageIndex = index"
                >
                  <div
                    class="
                      w-100
                      h-100
                      hotel-image-list__item__img
                      d-flex
                      justify-content-center
                      align-items-center
                    "
                    :style="[
                      !showAllImages &&
                      (meta.ImagesCount || images.length) > 20 &&
                      index == 19
                        ? {
                            'background-image':
                              'linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(' +
                                image['URL125x125'] || image.URL + ')',
                          }
                        : {
                            'background-image':
                              'url(' + image['URL125x125'] || image.URL + ')',
                          },
                    ]"
                  >
                    <span
                      v-if="
                        !showAllImages &&
                        (meta.ImagesCount || images.length) > 20 &&
                        index == 19
                      "
                      class="hotel-image__list__show-all"
                      @click="toggleImagesList"
                    >
                      {{ (meta.ImagesCount || images.length) - 20 }} +
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button
              v-if="showAllImages"
              class="closeImages"
              @click="showAllImages = false"
            >
              بستن عکس ها
            </button>
          </div>
          <div class="single-hotel-info">
            <div class="single-hotel-info__price">
              <div class="d-flex align-items-center">
                <div class="text-right">
                  <div
                    class="
                      single-hotel-info__price-price
                      d-flex
                      align-items-baseline
                    "
                  >
                    <div v-if="priceLoader" class="spinner ml-2">
                      <div class="bounce1" />
                      <div class="bounce2" />
                      <div class="bounce3" />
                    </div>
                    <span v-else-if="cheaperSeller">
                      <span>{{
                        cheaperSeller &&
                        (cheaperSeller.TotalPrice || cheaperSeller.Seller)
                          ? formatMoney(
                              cheaperSeller.TotalPrice ||
                                cheaperSeller.Seller.TotalPrice
                            )
                          : ""
                      }}</span>
                      <span class="mr-1">{{
                        (cheaperSeller.Seller &&
                          cheaperSeller.Seller.TotalPrice) ||
                        cheaperSeller.TotalPrice
                          ? "تومان"
                          : "قیمت ندارد"
                      }}</span>
                    </span>
                    <span v-else>بدون ظرفیت</span>
                  </div>
                  <span
                    v-if="cheaperSeller"
                    class="single-hotel-info__price-seller"
                    >{{
                      cheaperSeller
                        ? cheaperSeller.SellerName ||
                          (cheaperSeller.Seller &&
                            cheaperSeller.Seller &&
                            cheaperSeller.Seller.Name)
                        : ""
                    }}
                    (ارزانترین)</span
                  >
                </div>
                <div
                  v-scroll-to="{ el: '#desktopSellers', offset: -20 }"
                  class="seller-list__item"
                  @click="reserveButtonClick"
                >
                  {{ buttonTitle }}
                </div>
              </div>
            </div>
            <hr />
            <div
              v-if="nearestPlaces && nearestPlaces.length"
              class="d-flex justify-content-between mx-4 mt-3"
            >
              <span class="nearByPlace__title">فاصله از مکان های مهم</span>
              <div
                v-scroll-to="{ el: '#desktopPlaces', offset: -20 }"
                class="nearPlace-sort d-flex"
              >
                <span class="nearPlace-show-more">مکان های بیشتر</span>
                <span class="nearPlace-map">
                  <svg
                    class="mb-1"
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 0.75C6.08594 0.75 4.55469 2.30859 4.55469 4.19531C4.55469 5.75391 6.79688 8.54297 7.64453 9.58203C7.83594 9.77344 8.13672 9.77344 8.32812 9.58203C9.17578 8.54297 11.4453 5.75391 11.4453 4.19531C11.4453 2.30859 9.88672 0.75 8 0.75ZM8 5.34375C7.34375 5.34375 6.85156 4.85156 6.85156 4.19531C6.85156 3.56641 7.34375 3.04688 8 3.04688C8.62891 3.04688 9.14844 3.56641 9.14844 4.19531C9.14844 4.85156 8.62891 5.34375 8 5.34375ZM0.671875 6.65625C0.371094 6.79297 0.125 7.14844 0.125 7.47656V14.3125C0.125 14.6406 0.425781 14.8594 0.699219 14.7227L4.5 13V6.62891C4.25391 6.19141 4.03516 5.78125 3.89844 5.37109L0.671875 6.65625ZM8 10.5938C7.58984 10.5938 7.23438 10.4297 6.98828 10.1289C6.44141 9.5 5.86719 8.78906 5.375 8.02344V13L10.625 14.75V8.02344C10.1055 8.78906 9.53125 9.5 8.98438 10.1289C8.73828 10.4297 8.38281 10.5938 8 10.5938ZM15.2734 5.17969L11.5 6.875V14.75L15.3008 13.2461C15.6016 13.1094 15.875 12.7539 15.875 12.4258V5.58984C15.875 5.26172 15.5469 5.04297 15.2734 5.17969Z"
                      fill="#15BBCC"
                    />
                  </svg>
                  نقشه
                </span>
              </div>
            </div>
            <div v-if="address" class="single-hotel-info__address">
              <svg
                class="ml-1"
                width="11"
                height="14"
                viewBox="0 0 11 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.97266 13.4238C5.20996 13.793 5.76367 13.793 6.00098 13.4238C9.85059 7.88672 10.5625 7.30664 10.5625 5.25C10.5625 2.45508 8.29492 0.1875 5.5 0.1875C2.67871 0.1875 0.4375 2.45508 0.4375 5.25C0.4375 7.30664 1.12305 7.88672 4.97266 13.4238ZM5.5 7.35938C4.31348 7.35938 3.39062 6.43652 3.39062 5.25C3.39062 4.08984 4.31348 3.14062 5.5 3.14062C6.66016 3.14062 7.60938 4.08984 7.60938 5.25C7.60938 6.43652 6.66016 7.35938 5.5 7.35938Z"
                  fill="#BDBDBD"
                />
              </svg>
              <span>
                {{ address }}
              </span>
            </div>
            <div class="mobile-important-place d-flex">
              <div class="w-100 d-flex flex-wrap">
                <div
                  v-for="(place, index) in nearestPlaces && nearestPlaces.length
                    ? nearestPlaces.slice(0, 6)
                    : []"
                  :key="index"
                  :class="{
                    'border-bottom-0': index >= checkNearByPlaceLastItem - 1,
                  }"
                  class="mobile-important-place__item w-50 text-right"
                >
                  <span>{{ place.Title }}</span>
                  <span>{{ Math.round(place.Distance / 1000) }}km</span>
                </div>
              </div>
            </div>
            <div v-if="description" class="single-hotel-info__introduction">
              <p class="single-hotel-info__introduction__title">معرفی هتل</p>
              <div
                class="single-hotel-info__introduction__text"
                :style="{ 'max-height': descriptionHeight + 'px' }"
              >
                <p class="mb-0">
                  {{ description || "" }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="single-hotel-amenities">
        <div class="custom-container">
          <p class="single-hotel-amenities__title">
            <svg
              class="ml-3"
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.125 4.5H15V2.625C15 1.60938 14.1406 0.75 13.125 0.75H6.875C5.82031 0.75 5 1.60938 5 2.625V4.5H1.875C0.820312 4.5 0 5.35938 0 6.375V16.375C0 17.4297 0.820312 18.25 1.875 18.25H18.125C19.1406 18.25 20 17.4297 20 16.375V6.375C20 5.35938 19.1406 4.5 18.125 4.5ZM6.875 2.625H13.125V4.5H6.875V2.625ZM1.875 16.375V6.375H5V16.375H1.875ZM6.875 16.375V6.375H13.125V16.375H6.875ZM18.125 16.375H15V6.375H18.125V16.375Z"
                fill="#EB384D"
              />
            </svg>
            امکانات
          </p>
          <div class="d-flex flex-wrap single-hotel-amenities__list">
            <div
              v-for="(item, index) in showAllAmenities
                ? meta.Amenities
                : meta && meta.Amenities
                ? meta.Amenities.slice(0, 15)
                : []"
              :key="index"
              class="single-hotel-amenities__item"
            >
              <div>
                <img :src="item.Icon" :alt="item.Title" />
                <span> {{ item.Title }} </span>
              </div>
            </div>
            <div
              v-if="
                !showAllAmenities &&
                meta &&
                meta.Amenities &&
                meta.Amenities.length > 15
              "
              class="
                d-flex
                w-100
                justify-content-center
                align-items-baseline
                mt-2
              "
              @click="showAllAmenities = true"
            >
              <p class="showAllAmeneties mb-0">نمایش تمام امکانات</p>
              <svg
                class="mr-2"
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.05859 7.48438C6.23438 7.66016 6.48047 7.66016 6.65625 7.48438L11.8594 2.31641C12.0352 2.17578 12.0352 1.89453 11.8594 1.71875L11.1562 1.05078C11.0156 0.875 10.7344 0.875 10.5586 1.05078L6.375 5.19922L2.15625 1.05078C1.98047 0.875 1.73438 0.875 1.55859 1.05078L0.855469 1.71875C0.679688 1.89453 0.679688 2.17578 0.855469 2.31641L6.05859 7.48438Z"
                  fill="#EB384D"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <slot name="desktop-seller" />

      <div id="desktopPlaces" class="custom-container">
        <div class="single-hotel-nearbyPlace">
          <div class="single-hotel-nearbyPlace__title text-right mt-5 mb-4">
            <svg
              class="ml-2"
              width="15"
              height="21"
              viewBox="0 0 15 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 0.5C3.32031 0.5 0 3.89844 0 8C0 10.8125 0.898438 11.6719 5.89844 19.6406C6.64062 20.8125 8.32031 20.8125 9.0625 19.6406C14.0625 11.6719 15 10.8125 15 8C15 3.85938 11.6016 0.5 7.5 0.5ZM7.5 18.625C2.5 10.6562 1.875 10.1484 1.875 8C1.875 4.91406 4.375 2.375 7.5 2.375C10.5859 2.375 13.125 4.91406 13.125 8C13.125 10.1484 12.5 10.5781 7.5 18.625ZM4.375 8C4.375 9.75781 5.74219 11.125 7.5 11.125C9.21875 11.125 10.625 9.75781 10.625 8C10.625 6.28125 9.21875 4.875 7.5 4.875C5.74219 4.875 4.375 6.28125 4.375 8Z"
                fill="#EB384D"
              />
            </svg>
            <span>فاصله تا نقاط مهم </span>
          </div>
          <div
            v-if="meta && meta.NearByPlaces"
            class="
              single-hotel-nearbyPlace-map-box
              d-flex
              justify-content-between
            "
          >
            <div class="single-hotel-nearbyPlace-map-box__distance">
              <div
                v-for="(item, index) in meta.NearByPlaces"
                :key="index"
                class="
                  d-flex
                  justify-content-between
                  rtl
                  single-hotel-nearbyPlace-map-box__distance__row
                "
              >
                <div
                  class="
                    single-hotel-nearbyPlace-map-box__distance__title
                    py-3
                    text-right
                  "
                >
                  <span>فاصله تا</span>
                  <span>{{ item.Title }}</span>
                </div>
                <div
                  class="
                    single-hotel-nearbyPlace-map-box__distance__count
                    d-flex
                    align-items-center
                    justify-content-end
                  "
                >
                  <span> {{ Math.round(item.Distance / 1000) }} کیلومتر</span>
                </div>
              </div>
            </div>
            <div class="single-hotel-nearbyPlace-map-box__map">
              <button class="open-map-modal" @click="mapModal = true">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.332 9.96582C14.332 9.77832 14.1758 9.59082 13.957 9.59082H13.1133C12.8945 9.59082 12.7383 9.77832 12.7383 9.99707L12.8008 11.9033L12.7695 11.9346L8.42578 7.59082L12.7695 3.24707L12.8008 3.30957L12.7383 5.21582C12.7383 5.43457 12.8945 5.59082 13.1133 5.59082H13.957C14.1758 5.59082 14.332 5.43457 14.332 5.21582L14.3633 0.96582C14.3633 0.77832 14.1758 0.59082 13.9883 0.59082L9.73828 0.62207C9.51953 0.62207 9.36328 0.77832 9.36328 0.99707V1.84082C9.36328 2.05957 9.51953 2.21582 9.73828 2.21582L11.6445 2.15332L11.707 2.18457L7.36328 6.52832L3.01953 2.18457L3.05078 2.15332L4.95703 2.21582C5.17578 2.21582 5.36328 2.05957 5.36328 1.84082V0.99707C5.36328 0.77832 5.17578 0.62207 4.98828 0.62207L0.738281 0.59082C0.519531 0.59082 0.363281 0.77832 0.363281 0.96582V5.21582C0.363281 5.43457 0.519531 5.59082 0.738281 5.59082H1.58203C1.80078 5.59082 1.98828 5.43457 1.95703 5.21582L1.89453 3.30957L1.95703 3.24707L6.30078 7.59082L1.95703 11.9346L1.89453 11.9033L1.95703 9.99707C1.98828 9.77832 1.80078 9.59082 1.58203 9.59082H0.738281C0.519531 9.59082 0.363281 9.77832 0.363281 9.96582V14.2158C0.363281 14.4346 0.519531 14.5908 0.738281 14.5908H4.98828C5.17578 14.5908 5.36328 14.4346 5.36328 14.2158V13.3721C5.36328 13.1533 5.17578 12.9658 4.95703 12.9971L3.05078 13.0596L3.01953 12.9971L7.36328 8.65332L11.707 12.9971L11.6445 13.0596L9.73828 12.9971C9.51953 12.9658 9.36328 13.1533 9.36328 13.3721V14.2158C9.36328 14.4346 9.51953 14.5908 9.73828 14.5908H13.9883C14.1758 14.5908 14.3633 14.4346 14.3633 14.2158L14.332 9.96582Z"
                    fill="#EB384D"
                  />
                </svg>
              </button>
              <client-only>
                <GmapMap
                  :center="center"
                  :zoom="13"
                  map-type-id="terrain"
                  style="
                    width: 100%;
                    height: 400px;
                    border: 1px solid #dddddd;
                    border-radius: 10px;
                  "
                  :options="{
                    fullscreenControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    zoomControl: false,
                  }"
                >
                  <GmapMarker
                    v-for="(m, index) in markers[0]"
                    :key="index"
                    :position="m.position"
                    :title="m.title"
                    :icon="icon"
                  />
                  <GmapMarker
                    ref="myMarker"
                    :position="center"
                    :title="hotelType.Name + nameFa"
                  />
                </GmapMap>
              </client-only>
            </div>
          </div>
        </div>
      </div>
      <div id="desktopComments" class="custom-container">
        <div class="single-hotel-nearbyPlace__title text-right mt-5 mb-4">
          <svg
            class="ml-2"
            width="23"
            height="21"
            viewBox="0 0 23 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.25 6.75H16.5V3C16.5 1.63281 15.3672 0.5 14 0.5H2.75C1.34375 0.5 0.25 1.63281 0.25 3V9.25C0.25 10.6562 1.34375 11.75 2.75 11.75H4V13.7812C4 14.0938 4.19531 14.25 4.46875 14.25C4.54688 14.25 4.625 14.25 4.74219 14.1719L7.75 12.4922V15.5C7.75 16.9062 8.84375 18 10.25 18H14L18.2188 20.4219C18.3359 20.5 18.4141 20.5 18.5312 20.5C18.7656 20.5 19 20.3438 19 20.0312V18H20.25C21.6172 18 22.75 16.9062 22.75 15.5V9.25C22.75 7.88281 21.6172 6.75 20.25 6.75ZM4 9.875H2.75C2.39844 9.875 2.125 9.60156 2.125 9.25V3C2.125 2.6875 2.39844 2.375 2.75 2.375H14C14.3125 2.375 14.625 2.6875 14.625 3V9.25C14.625 9.60156 14.3125 9.875 14 9.875H8.49219L8.0625 10.1484L5.875 11.3984V9.875H4ZM20.875 15.5C20.875 15.8516 20.5625 16.125 20.25 16.125H17.125V17.6484L14.8984 16.3984L14.4688 16.125H10.25C9.89844 16.125 9.625 15.8516 9.625 15.5V11.75H14C15.3672 11.75 16.5 10.6562 16.5 9.25V8.625H20.25C20.5625 8.625 20.875 8.9375 20.875 9.25V15.5Z"
              fill="#EB384D"
            />
          </svg>
          <span>نظرات کاربر</span>
        </div>
        <div
          v-if="comments && comments.length"
          class="single-hotel-comment-box d-flex align-items-center"
        >
          <div class="d-flex justify-content-center">
            <div
              class="
                single-hotel-comment-rate__box
                d-flex
                justify-content-center
                align-items-center
              "
              :style="{
                background:
                  rateLevel > 5 || rateLevel == 5 ? '#1899a7' : '#EB384D',
              }"
            >
              {{ rateLevel }}
            </div>
            <div class="d-flex flex-column single-hotel-comment-rate__rate">
              <span class="text-right">{{ rateLevel.Caption }}</span>
              <span> از بین {{ comments && comments.length }} نظر</span>
            </div>
          </div>
          <div
            class="d-flex flex-wrap single-hotel-comment-rate__provider-rate"
          >
            <div
              v-for="(detail, i) in meta.CommentDetails &&
              meta.CommentDetails.Details"
              :key="i"
              class="
                single-hotel-comment-rate__provider-rate__item
                d-flex
                flex-column
              "
            >
              <span>
                {{ detail.Provider }} ({{ detail.AverageRate }} / 10)
                <span
                  v-if="
                    i !==
                    (meta.CommentDetails &&
                      meta.CommentDetails.Details.length - 1)
                  "
                >
                  ،
                </span>
              </span>
            </div>
          </div>
          <button
            class="btn mr-auto add-new-comment-btn"
            @click="commentModal = true"
          >
            + ثبت نظر جدید
          </button>
        </div>
        <div v-else class="single-hotel-comment-box d-flex align-items-center">
          <img src="~/assets/images/radar-comment.png" alt="radar-comment" />
          <div class="d-flex flex-column empty-state-text">
            <span>نظری برای این اقامتگاه ثبت نشده‌است!</span>
            <span
              >اولین نفر باشید که دیدگاهتان را برای این اقامتگاه
              می‌نویسید.</span
            >
          </div>
          <button
            class="btn mr-auto add-new-comment-btn"
            @click="commentModal = true"
          >
            + ثبت نظر جدید
          </button>
        </div>
        <div v-if="commentModal" class="custom-modal">
          <div class="single-hotel-comment-rate d-flex flex-column">
            <div
              class="single-hotel-comment-rate__header"
              @click="commentModal = false"
            >
              <span> ثبت نظر جدید برای هتل{{ nameFa }}</span>
              <span
                ><svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0469 8L14.875 3.21875L15.8594 2.23438C16 2.09375 16 1.85938 15.8594 1.67188L14.8281 0.640625C14.6406 0.5 14.4062 0.5 14.2656 0.640625L8.5 6.45312L2.6875 0.640625C2.54688 0.5 2.3125 0.5 2.125 0.640625L1.09375 1.67188C0.953125 1.85938 0.953125 2.09375 1.09375 2.23438L6.90625 8L1.09375 13.8125C0.953125 13.9531 0.953125 14.1875 1.09375 14.375L2.125 15.4062C2.3125 15.5469 2.54688 15.5469 2.6875 15.4062L8.5 9.59375L13.2812 14.4219L14.2656 15.4062C14.4062 15.5469 14.6406 15.5469 14.8281 15.4062L15.8594 14.375C16 14.1875 16 13.9531 15.8594 13.8125L10.0469 8Z"
                    fill="black"
                  />
                </svg>
              </span>
            </div>
            <div class="add-commnet-wrapper">
              <div class="d-flex">
                <div class="d-flex flex-column text-right trip-type-wrapper">
                  <p class="title">چه نوع سفری داشته‌اید؟</p>
                  <div class="trip-type d-flex">
                    <span
                      :class="{ 'selected-trip-type': selectedTripType === 1 }"
                      @click="selectedTripType = 1"
                      >کاری
                    </span>
                    <span
                      :class="{ 'selected-trip-type': selectedTripType === 2 }"
                      @click="selectedTripType = 2"
                      >انفرادی</span
                    >
                    <span
                      :class="{ 'selected-trip-type': selectedTripType === 3 }"
                      @click="selectedTripType = 3"
                      >خانوادگی
                    </span>
                    <span
                      :class="{ 'selected-trip-type': selectedTripType === 4 }"
                      @click="selectedTripType = 4"
                      >با دوستان</span
                    >
                  </div>
                </div>
                <div class="d-flex flex-column align-items-baseline mx-auto">
                  <p>امتیاز کلی شما برای این اقامتگاه</p>
                  <div
                    class="rating d-flex align-items-center"
                    @mouseleave.self="deleteRating"
                  >
                    <span
                      v-for="star in 5"
                      :key="star"
                      class="star"
                      :class="{ filled: rating >= star || ratingHover >= star }"
                      @mouseenter="hoverRating(star)"
                      @click.stop="selectRating(star)"
                    />
                    <span class="rating-text">
                      <span>
                        {{
                          ratingHover === 0 ? "برای امتیاز دهی کلیک کنید" : ""
                        }}
                        {{ ratingHover === 1 ? "خیلی ضعیف" : "" }}
                        {{ ratingHover === 2 ? "ضعیف" : "" }}
                        {{ ratingHover === 3 ? "متوسط" : "" }}
                        {{ ratingHover === 4 ? "خیلی خوب" : "" }}
                        {{ ratingHover === 5 ? "فوق العاده" : "" }}
                      </span>
                      <span class="rating-text-arrow" />
                    </span>
                  </div>
                </div>
              </div>
              <div class="text-right comment-box">
                <p class="title">دیدگاه شما</p>
                <textarea
                  placeholder="تجربه‌تان پیرامون اتاق، موقعیت، خدمات، نظافت و ... چیست؟"
                />
              </div>
              <button class="add-comment-btn">ثبت نظر</button>
            </div>
          </div>
        </div>
        <client-only>
          <div
            v-if="slicesAccommodationComments.length"
            class="single-hotel-comment__list"
          >
            <div
              v-for="(comment, index) in slicesAccommodationComments"
              :key="index"
            >
              <comment :comment="comment" :single-hotel="true" />
              <hr v-if="index != slicesAccommodationComments.length - 1" />
            </div>
            <pagination
              v-if="commentsTotalPage > 1"
              :page-count="commentsTotalPage"
              :force-page="forcePage"
              @loadMoreComments="loadMoreComments"
            />
          </div>
        </client-only>
      </div>
      <div class="single-hotel-rule-container">
        <div class="custom-container">
          <div class="single-hotel-nearbyPlace__title text-right mb-4">
            <svg
              width="23"
              height="21"
              viewBox="0 0 23 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.5547 8.07812L21.6562 7.21875C21.4219 6.98438 21.0312 6.98438 20.7969 7.21875L20.3281 7.64844L19.1953 6.51562C19.4297 5.69531 19.2344 4.75781 18.5703 4.13281L16.8125 2.33594C15.5625 1.125 14 0.5 12.3984 0.5C10.7969 0.5 9.19531 1.125 7.94531 2.33594L10.6016 4.99219V5.73438C10.6016 6.04688 10.6797 6.35938 10.7969 6.63281L1.10938 15.6562C-0.0234375 16.75 -0.0625 18.5859 1.07031 19.6797C1.61719 20.2656 2.32031 20.5 3.02344 20.5C3.76562 20.5 4.50781 20.2266 5.09375 19.6406L14.1172 9.95312C14.3906 10.0703 14.7031 10.1484 15.0156 10.1484C15.25 10.1484 15.4453 10.1094 15.6797 10.0703L16.8125 11.2031L16.3438 11.6328C16.1094 11.8672 16.1094 12.2578 16.3438 12.5312L17.2422 13.3906C17.4766 13.625 17.8672 13.625 18.1406 13.3906L22.5547 8.97656C22.7891 8.74219 22.7891 8.35156 22.5547 8.07812ZM3.72656 18.3516C3.33594 18.7812 2.71094 18.7031 2.35938 18.3906C1.96875 17.9609 2.04688 17.375 2.39844 17.0234L11.9688 8.11719L12.6328 8.78125L3.72656 18.3516ZM18.5703 10.3047L16.2266 7.96094L15.2109 8.23438C14.8203 8.35156 14.5859 8.11719 14.5859 8.07812L12.6719 6.16406C12.5547 6.04688 12.4766 5.89062 12.4766 5.73438V4.21094L10.9141 2.64844C11.3828 2.49219 11.8906 2.375 12.3984 2.375C13.5703 2.375 14.6641 2.84375 15.4844 3.66406L17.2422 5.46094C17.4766 5.65625 17.4375 5.96875 17.3984 6.04688L17.125 7.10156L19.4688 9.40625L18.5703 10.3047Z"
                fill="#EB384D"
              />
            </svg>
            <span>قوانین</span>
          </div>
          <div class="d-flex">
            <div class="single-hotel-time d-flex flex-column">
              <div class="d-flex justify-content-between align-items-center">
                <span class="single-hotel-time__title">
                  <svg
                    width="15"
                    height="12"
                    viewBox="0 0 15 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.01367 2.12695C3.7207 2.39062 3.7207 2.85938 4.01367 3.12305L6.29883 5.20312H0.703125C0.292969 5.20312 0 5.52539 0 5.90625V6.84375C0 7.25391 0.292969 7.54688 0.703125 7.54688H6.29883L4.04297 9.62695C3.7207 9.91992 3.7207 10.3594 4.01367 10.6523L4.6582 11.2969C4.92188 11.5605 5.36133 11.5605 5.6543 11.2969L10.0781 6.90234C10.3711 6.60938 10.3711 6.16992 10.0781 5.87695L5.6543 1.48242C5.36133 1.18945 4.92188 1.21875 4.6582 1.48242L4.01367 2.12695ZM15 9.1875V3.5625C15 2.00977 13.7402 0.75 12.1875 0.75H9.72656C9.52148 0.75 9.375 0.925781 9.375 1.10156V2.27344C9.375 2.47852 9.52148 2.625 9.72656 2.625H12.1875C12.6855 2.625 13.125 3.06445 13.125 3.5625V9.1875C13.125 9.71484 12.6855 10.125 12.1875 10.125H9.72656C9.52148 10.125 9.375 10.3008 9.375 10.4766V11.6484C9.375 11.8535 9.52148 12 9.72656 12H12.1875C13.7402 12 15 10.7402 15 9.1875Z"
                      fill="#EB384D"
                    />
                  </svg>
                  ورود:
                </span>
                <span class="single-hotel-time__time">{{ checkInHour }}</span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <span class="single-hotel-time__title">
                  <svg
                    width="15"
                    height="12"
                    viewBox="0 0 15 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.27344 12C5.44922 12 5.625 11.8535 5.625 11.6484V10.4766C5.625 10.3008 5.44922 10.125 5.27344 10.125H2.8125C2.28516 10.125 1.875 9.71484 1.875 9.1875V3.5625C1.875 3.06445 2.28516 2.625 2.8125 2.625H5.27344C5.44922 2.625 5.625 2.47852 5.625 2.27344V1.10156C5.625 0.925781 5.44922 0.75 5.27344 0.75H2.8125C1.25977 0.75 0 2.00977 0 3.5625V9.1875C0 10.7402 1.25977 12 2.8125 12H5.27344ZM8.70117 3.12305L10.9863 5.20312H5.39062C4.98047 5.20312 4.6875 5.52539 4.6875 5.90625V6.84375C4.6875 7.25391 4.98047 7.54688 5.39062 7.54688H10.9863L8.70117 9.65625C8.4082 9.91992 8.4082 10.3887 8.70117 10.6523L9.3457 11.2969C9.60938 11.5605 10.0488 11.5898 10.3125 11.2969L14.7656 6.87305C15.0586 6.60938 15.0586 6.16992 14.7656 5.87695L10.3418 1.48242C10.0488 1.18945 9.60938 1.18945 9.3457 1.48242L8.70117 2.12695C8.4082 2.39062 8.4082 2.85938 8.70117 3.12305Z"
                      fill="#EB384D"
                    />
                  </svg>
                  خروج:
                </span>
                <span class="single-hotel-time__time">{{ checkOutHour }}</span>
              </div>
            </div>
            <div class="d-flex flex-column single-hotel-rule-text">
              <p>قوانین کنسلی بسته به نوع اتاق متفاوت است .</p>
              <p>
                هر نفر اضافه تخت و نفراضاه مشمول هزینه است و هنگام ورود هماهنگ
                میشود.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="mapModal" class="custom-modal">
        <div class="modal-container">
          <div class="hotel-name">
            <p class="text-right d-flex align-items-center">
              <font-awesome-icon
                :icon="['fas', 'times']"
                style="background: transparent; border: none"
                @click="mapModal = false"
                class="fa-style"
              />
              {{ nameFa }}
            </p>
          </div>
          <client-only>
            <div class="position-relative">
              <GmapMap
                :center="center"
                :zoom="15"
                map-type-id="terrain"
                style="width: 100%; height: 450px"
                :options="{
                  zoomControl: true,
                  fullscreenControl: false,
                  mapTypeControl: false,
                  scaleControl: false,
                  streetViewControl: false,
                }"
              >
                <GmapMarker
                  v-for="(m, index) in markers"
                  :key="index"
                  :position="m.position"
                  :title="m.title"
                  :icon="icon"
                />
                <GmapMarker
                  ref="myMarker"
                  :position="center"
                  :title="hotelType.Name + nameFa"
                />
              </GmapMap>
            </div>
          </client-only>
        </div>
      </div>
      <div class="similar-hotel-container">
        <div class="single-hotel-simalar__title text-right mt-5 mb-4">
          <span>به دنبال اقامت‌گاه‌های مشابه می‌گردید؟</span>
        </div>
        <div
          class="
            d-flex
            flex-row
            justify-content-xl-between justify-content-md-center
            align-content-center
            flex-wrap
          "
        >
          <div
            v-for="hotel in similarHotels"
            :key="hotel.name"
            class="card hotel-card"
          >
            <similar-hotels-card :hotel="hotel" :city-name="city" />
          </div>
        </div>
      </div>
    </div>
    <div class="single-hotel-mobile">
      <div :class="{ 'd-block': true }">
        <div class="single-hotel-mobile__details__navbar">
          <div class="mobile-top-info d-flex align-items-center">
            <img
              src="~/assets/images/arrow-right.png"
              alt="right arrow"
              @click="backToPreviousPage"
            />
            <div class="d-flex flex-column mobile-top-info__name">
              <nuxt-link to="/">
                {{ hotelType.Name }} {{ nameFa || "" }}
              </nuxt-link>
              <div class="text-right">
                <svg
                  v-for="i in hotelType.Stars"
                  :key="i"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.56445 0.761719L4.16797 3.61914L1.00977 4.07031C0.451172 4.15625 0.236328 4.84375 0.644531 5.25195L2.90039 7.46484L2.36328 10.5801C2.27734 11.1387 2.87891 11.5684 3.37305 11.3105L6.1875 9.82812L8.98047 11.3105C9.47461 11.5684 10.0762 11.1387 9.99023 10.5801L9.45312 7.46484L11.709 5.25195C12.1172 4.84375 11.9023 4.15625 11.3438 4.07031L8.20703 3.61914L6.78906 0.761719C6.55273 0.267578 5.82227 0.246094 5.56445 0.761719Z"
                    fill="#FFCD4F"
                  />
                </svg>
              </div>
            </div>
            <div v-if="priceLoader" class="spinner ml-2 mr-auto">
              <div class="bounce1" />
              <div class="bounce2" />
              <div class="bounce3" />
            </div>
            <div
              v-else-if="cheaperSeller && cheaperSeller.TotalPrice"
              class="mobile-top-info__price"
            >
              <span>{{
                formatMoney(
                  roomPrice && cheaperSeller && cheaperSeller.TotalPrice
                    ? cheaperSeller.TotalPrice
                    : ""
                )
              }}</span>
              <span>تومان</span>
            </div>
            <span v-else class="mobile-top-info__price"> بدون ظرفیت </span>
          </div>
          <div class="mobile-top-info__list">
            <div
              v-scroll-to="{ el: '#aboutHotel', offset: -115 }"
              class="mobile-top-info__list-item"
              :class="{
                'mobile-top-info__list-item__active':
                  selectedMenu == 'aboutHotel',
              }"
              @click="selectedMenu = 'aboutHotel'"
            >
              {{
                cheaperSeller && cheaperSeller.Seller
                  ? "رزرو"
                  : "درباره‌ی اقامتگاه"
              }}
            </div>
            <div
              v-scroll-to="{ el: '#seller', offset: -110 }"
              class="mobile-top-info__list-item"
              :class="{
                'mobile-top-info__list-item__active': selectedMenu == 'seller',
              }"
              @click="selectedMenu = 'seller'"
            >
              فروشندگان
            </div>
            <div
              v-scroll-to="{ el: '#hotelImage', offset: -110 }"
              class="mobile-top-info__list-item"
              :class="{
                'mobile-top-info__list-item__active':
                  selectedMenu == 'hotelImage',
              }"
              @click="selectedMenu = 'hotelImage'"
            >
              تصاویر
            </div>
            <div
              v-scroll-to="{ el: '#comment', offset: -120 }"
              class="mobile-top-info__list-item"
              :class="{
                'mobile-top-info__list-item__active': selectedMenu == 'comment',
              }"
              @click="selectedMenu = 'comment'"
            >
              امتیاز و نظرات
            </div>
          </div>
        </div>
        <div
          id="hotelImage"
          ref="hotelImage"
          class="single-hotel-mobile__details__images"
        >
          <single-hotel-image-slider
            :images="images"
            :image-index="imageIndex"
          />
          <div
            class="mobile-image-list"
            :style="[!showAllSingleHotelImage ? { height: 'unset' } : '']"
          >
            <div class="d-flex flex-wrap" style="direction: rtl">
              <div
                v-for="(image, index) in images &&
                images.length > 5 &&
                !showAllSingleHotelImage
                  ? images && images.length
                    ? images.slice(0, 4)
                    : []
                  : images"
                :key="index"
                class="mobile-image-list__item"
                @click="imageIndex = index"
              >
                <image-loader
                  :image="image"
                  :index="index"
                  :current-slide="imageIndex"
                />
              </div>
              <div
                v-if="!showAllSingleHotelImage"
                class="mobile-image-list__item"
                @click="showAllSingleHotelImage = true"
              >
                <div
                  v-if="images && images.length > 4"
                  class="
                    w-100
                    h-100
                    mobile-image-list__item__img
                    d-flex
                    justify-content-center
                  "
                  :style="{
                    'background-image': `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${images[4].URL}`,
                  }"
                >
                  <div class="single-hotel-see-more-image">
                    <span>همه</span>
                    <span>تصاویر</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="showAllSingleHotelImage"
            class="bg-white see-less-image"
            @click="showAllSingleHotelImage = false"
          >
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.65625 1.05078C6.48047 0.875 6.23438 0.875 6.05859 1.05078L0.855469 6.18359C0.679688 6.35938 0.679688 6.64062 0.855469 6.78125L1.55859 7.48438C1.73438 7.66016 1.98047 7.66016 2.15625 7.48438L6.375 3.33594L10.5586 7.48438C10.7344 7.66016 11.0156 7.66016 11.1562 7.48438L11.8594 6.78125C12.0352 6.64062 12.0352 6.35938 11.8594 6.18359L6.65625 1.05078Z"
                fill="#EB384D"
              />
            </svg>
            بستن تصاویر
          </div>
        </div>
        <div id="aboutHotel" ref="aboutHotel" class="single-hotel-info-tab">
          <div
            class="d-flex justify-content-between"
            style="margin: 20px 20px 0px 27px"
          >
            <div class="d-flex flex-column">
              <span class="single-hotel-info-tab__hotel-name"
                >{{ hotelType.Name }} {{ nameFa }}</span
              >
              <div class="text-right">
                <svg
                  v-for="i in hotelType.Stars"
                  :key="i"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.56445 0.761719L4.16797 3.61914L1.00977 4.07031C0.451172 4.15625 0.236328 4.84375 0.644531 5.25195L2.90039 7.46484L2.36328 10.5801C2.27734 11.1387 2.87891 11.5684 3.37305 11.3105L6.1875 9.82812L8.98047 11.3105C9.47461 11.5684 10.0762 11.1387 9.99023 10.5801L9.45312 7.46484L11.709 5.25195C12.1172 4.84375 11.9023 4.15625 11.3438 4.07031L8.20703 3.61914L6.78906 0.761719C6.55273 0.267578 5.82227 0.246094 5.56445 0.761719Z"
                    fill="#FFCD4F"
                  />
                </svg>
              </div>
            </div>
            <div id="aboutHotel" class="d-flex">
              <div class="d-flex flex-column">
                <span class="single-hotel-info-tab__rate-level">{{
                  meta && meta.RateLevel && meta.RateLevel.Caption
                    ? meta.RateLevel.Caption
                    : ""
                }}</span>
                <span class="single-hotel-info-tab__comments-count"
                  >از بین{{
                    (comments ? comments.length : 0) ||
                    (meta &&
                      meta.CommentDetails &&
                      meta.CommentDetails.CommentsCount)
                  }}
                  نظر</span
                >
              </div>
              <span class="single-hotel-info-tab__average-rate">{{
                rateLevel
              }}</span>
            </div>
          </div>
          <about-hotel :hotel-details="meta" :amenities="meta.Amenities" />
        </div>
        <div ref="seller">
          <slot name="seller" />
        </div>
        <div id="comment" ref="comment" :class="{ '': !showMoreComments }">
          <div class="comments-mobile-header">
            <span class="comments-mobile-header__title">نظرات کاربران</span>
            <div v-if="comments && comments.length" class="d-flex">
              <button class="btn filte-comments-btn">
                فیلتر نظرات
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3711 0.75C13.6628 0.75 13.8633 0.886719 13.9727 1.16016C14.082 1.43359 14.0365 1.67057 13.8359 1.87109L8.77734 6.92969V14.0938C8.77734 14.3672 8.65885 14.5586 8.42188 14.668C8.1849 14.7956 7.95703 14.7865 7.73828 14.6406L5.55078 13.1094C5.36849 12.9635 5.27734 12.7812 5.27734 12.5625V6.92969L0.21875 1.87109C0.0182292 1.67057 -0.0273438 1.43359 0.0820312 1.16016C0.191406 0.886719 0.391927 0.75 0.683594 0.75H13.3711Z"
                    fill="#333333"
                  />
                </svg>
              </button>
              <button
                class="btn mr-auto add-new-comment-btn"
                @click="commentModal = true"
              >
                + ثبت نظر جدید
              </button>
            </div>
            <div
              v-else
              class="
                single-hotel-comment-box
                d-flex
                empty-state
                align-items-center
              "
            >
              <img
                src="~/assets/images/radar-comment.png"
                alt="radar-comment"
              />
              <div class="d-flex flex-column empty-state-text">
                <span>نظری برای این اقامتگاه ثبت نشده‌است!</span>
                <span
                  >اولین نفر باشید که دیدگاهتان را برای این اقامتگاه
                  می‌نویسید.</span
                >
              </div>
              <button
                class="btn mr-auto add-new-comment-btn"
                @click="commentModal = true"
              >
                + ثبت نظر جدید
              </button>
            </div>
          </div>
          <div
            v-if="comments && comments.length"
            class="d-flex justify-content-between mb-2 align-items-center my-3"
          >
            <div class="d-flex">
              <div
                class="
                  hotel-average-rate
                  d-flex
                  justify-content-center
                  align-items-center
                "
                :style="{
                  background:
                    rateLevel > 5 || rateLevel == 5 ? '#1899a7' : '#EB384D',
                }"
              >
                {{ rateLevel }}
              </div>
              <div
                class="
                  comments-number
                  mr-1
                  d-flex
                  flex-column
                  align-items-baseline
                "
              >
                <span class="hotel-average-text">{{
                  rateLevel == 0 ? "بدون نظر" : rateLevel && rateLevel.Caption
                }}</span>
                <div>
                  <span> از بین</span>
                  <span>{{ comments ? comments.length : 0 }}</span>
                  <span> نظر</span>
                </div>
              </div>
            </div>
            <slot name="commets-detail" />
          </div>
          <hr />
          <div v-if="commentModal" class="custom-modal">
            <div class="single-hotel-comment-rate d-flex flex-column">
              <div class="single-hotel-comment-rate__header">
                <span> ثبت نظر جدید</span>
                <span @click="commentModal = false">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.0469 8L14.875 3.21875L15.8594 2.23438C16 2.09375 16 1.85938 15.8594 1.67188L14.8281 0.640625C14.6406 0.5 14.4062 0.5 14.2656 0.640625L8.5 6.45312L2.6875 0.640625C2.54688 0.5 2.3125 0.5 2.125 0.640625L1.09375 1.67188C0.953125 1.85938 0.953125 2.09375 1.09375 2.23438L6.90625 8L1.09375 13.8125C0.953125 13.9531 0.953125 14.1875 1.09375 14.375L2.125 15.4062C2.3125 15.5469 2.54688 15.5469 2.6875 15.4062L8.5 9.59375L13.2812 14.4219L14.2656 15.4062C14.4062 15.5469 14.6406 15.5469 14.8281 15.4062L15.8594 14.375C16 14.1875 16 13.9531 15.8594 13.8125L10.0469 8Z"
                      fill="black"
                    />
                  </svg>
                </span>
              </div>
              <div class="add-commnet-wrapper">
                <div class="d-flex flex-column">
                  <div class="d-flex flex-column align-items-baseline">
                    <p>امتیاز کلی شما برای این اقامتگاه</p>
                    <div
                      class="rating d-flex align-items-center"
                      @mouseleave.self="deleteRating"
                    >
                      <span
                        v-for="star in 5"
                        :key="star"
                        class="star"
                        :class="{
                          filled: rating >= star || ratingHover >= star,
                        }"
                        @mouseenter="hoverRating(star)"
                        @click.stop="selectRating(star)"
                      />
                    </div>
                  </div>
                  <div class="d-flex flex-column text-right trip-type-wrapper">
                    <p class="title">چه نوع سفری داشته‌اید؟</p>
                    <div class="trip-type d-flex">
                      <span
                        :class="{
                          'selected-trip-type': selectedTripType === 1,
                        }"
                        @click="selectedTripType = 1"
                        >کاری
                      </span>
                      <span
                        :class="{
                          'selected-trip-type': selectedTripType === 2,
                        }"
                        @click="selectedTripType = 2"
                        >انفرادی</span
                      >
                      <span
                        :class="{
                          'selected-trip-type': selectedTripType === 3,
                        }"
                        @click="selectedTripType = 3"
                        >خانوادگی
                      </span>
                      <span
                        :class="{
                          'selected-trip-type': selectedTripType === 4,
                        }"
                        @click="selectedTripType = 4"
                        >با دوستان</span
                      >
                    </div>
                  </div>
                </div>
                <div class="text-right comment-box">
                  <p class="title">دیدگاه شما</p>
                  <textarea
                    placeholder="تجربه‌تان پیرامون اتاق، موقعیت، خدمات، نظافت و ... چیست؟"
                  />
                </div>
                <button class="add-comment-btn w-100">ثبت نظر</button>
              </div>
            </div>
          </div>
          <div
            v-for="(comment, index) in comments && comments.length
              ? comments
              : []"
            :key="index"
          >
            <client-only>
              <comment :comment="comment" />
            </client-only>
            <hr />
          </div>
          <div
            v-if="commentPage < commentsTotalPage"
            class="more-comments"
            @click="loadMoreComments"
          >
            <span>
              نظرات بیشتر
              <font-awesome-icon
                :icon="['fas', 'chevron-down']"
                class="mt-1 comment-more-arrow fa-style"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
    <LazyHydrate when-visible>
      <faq
        v-if="
          frequentlyAskedQuestions &&
          frequentlyAskedQuestions.length &&
          ($route.query.CheckInDate == null ||
            $route.query.CheckOutDate == null)
        "
        :faq="frequentlyAskedQuestions"
      />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <hotel-description
        v-if="
          $route.query.CheckInDate == null || $route.query.CheckOutDate == null
        "
        :footer="footer"
      />
    </LazyHydrate>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  faChevronLeft,
  faChevronRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import LazyHydrate from "vue-lazy-hydration";
import searchDates from "@/mixins/searchDates";
import "hooper/dist/hooper.css";
import HotelDescription from "~/components/hotel/hotelDescription";
import similarHotelsCard from "~/components/hotel/singleHotel/similarHotelCard";
import ImageLoader from "~/components/hotel/ImageLoader";
import SingleHotelImageSlider from "~/components/hotel/singleHotel/singleHotelImageSlider";

import Comment from "~/components/hotel/Comment";
import Pagination from "~/components/layouts/pagination.vue";
library.add(faChevronRight, faChevronLeft, faStar);
const moment = require("moment-jalaali");
export default {
  components: {
    aboutHotel: () => import("~/components/hotel/AboutHotel.vue"),
    HotelDescription,
    SingleHotelImageSlider,
    similarHotelsCard,
    ImageLoader,
    Faq: () => import("~/components/faq"),
    LazyHydrate,
    Comment,
    Pagination,
  },
  mixins: [searchDates],
  props: {
    meta: {
      type: Object,
      default() {
        return {};
      },
    },
    priceLoader: Boolean,
    city: {
      type: String,
      default: "",
    },
    accommodationName: {
      type: String,
      default: "",
    },
    comments: {
      type: Array,
      default() {
        return [];
      },
    },
    cityNameFa: {
      type: String,
      default: "",
    },
    nearestPlaces: {
      type: Array,
      default() {
        return [];
      },
    },
    rateLevel: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      default() {
        return [];
      },
    },
    hotelType: {
      type: Object,
      default() {
        return {};
      },
    },
    nameFa: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    checkInHour: {
      type: String,
      default: "",
    },
    checkOutHour: {
      type: String,
      default: "",
    },
    cheaperSeller: {
      type: Object,
      default() {
        return {};
      },
    },
    buttonTitle: {
      type: String,
      default: "",
    },
    frequentlyAskedQuestions: {
      type: Array,
      default() {
        return [];
      },
    },
    footer: {
      type: String,
      default: "",
    },
    loading: Boolean,
    commentsCount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    similarHotels: {
      type: Array,
      default() {
        return [];
      },
    },
    commentsTotalPage: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      forcePage: 1,
      showAllImages: false,
      showAllSingleHotelImage: false,
      roomPrice: {},
      showAllAmenities: false,
      icon: {
        url: require("~/assets/images/Vector.png"),
        scaledSize: { width: 25, height: 32 },
      },
      roomPriceShowState: [],
      mapModal: false,
      detailsOpen: false,
      showTab: 1,
      showMoreComments: false,
      selectedMenu: "hotelImage",
      imageIndex: 0,
      hooperSettings: {
        itemsToShow: 2,
        centerMode: true,
      },
      rating: 0,
      ratingHover: 0,
      commentPage: 1,
      commentModal: false,
      selectedTripType: 0,
    };
  },
  computed: {
    markers() {
      const arr = [];
      arr.push(
        this.meta.NearByPlaces.map((item) => ({
          position: {
            lat: parseFloat(item.Latitude),
            lng: parseFloat(item.Longitude),
          },
          title: item.Title,
        }))
      );
      return arr;
    },
    center() {
      return {
        lat: parseFloat(this.meta.Latitude),
        lng: parseFloat(this.meta.Longitude),
      };
    },
    slicesAccommodationComments() {
      if (this.commentPage === 1) {
        return this.comments.slice(0, 5);
      }
      const getCommentCount =
        this.commentsCount >= this.commentPage * 6 - 1
          ? this.commentPage * 6 - 1
          : this.commentsCount;
      return this.comments && this.comments.length
        ? this.comments.slice(this.commentPage * 6 - 7, getCommentCount)
        : [];
    },
    checkNearByPlaceLastItem() {
      if (this.nearestPlaces) {
        if (this.nearestPlaces.length % 2 === 0) {
          return this.nearestPlaces.length - 1;
        } else {
          return this.nearestPlaces.length;
        }
      } else {
        return 0;
      }
    },
    descriptionHeight() {
      if (this.nearestPlaces) {
        return (
          425 -
          110 -
          40 -
          10 -
          (39 * Math.ceil(this.nearestPlaces.slice(0, 6).length)) / 2 -
          55
        );
      } else {
        return 0;
      }
    },
    searchedDuration() {
      return (
        moment(this.$route.query.CheckOutDate, "jYYY-jMM-jDD").diff(
          moment(this.$route.query.CheckInDate, "jYYY-jMM-jDD")
        ) /
        1000 /
        3600 /
        24
      );
    },
  },
  watch: {
    detailsOpen(val) {
      if (val === true) {
        this.toggleBodyClass("addClass", "body-overflow");
      } else {
        this.toggleBodyClass("removeClass", "body-overflow");
      }
    },
    commentModal(val) {
      if (val === true) {
        this.toggleBodyClass("addClass", "body-overflow");
      } else {
        this.toggleBodyClass("removeClass", "body-overflow");
      }
    },
  },
  created() {
    if (process.client) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  destroyed() {
    if (process.client) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  },
  methods: {
    toggleImagesList() {
      console.log(123);
    },
    hoverRating(val) {
      this.ratingHover = val;
    },
    selectRating(val) {
      this.rating = val;
      this.ratingHover = val;
    },
    deleteRating() {
      // this.ratingHover = 0;
    },
    handleScroll(event) {
      if (process.client) {
        if (this.$refs.comment.offsetTop < window.scrollY) {
          this.selectedMenu = "comment";
        }
        if (
          this.$refs.seller.offsetTop < window.scrollY &&
          this.$refs.seller.offsetTop + this.$refs.seller.clientHeight >
            window.scrollY
        ) {
          this.selectedMenu = "seller";
        }
        if (
          this.$refs.aboutHotel.offsetTop < window.scrollY &&
          this.$refs.aboutHotel.offsetTop + this.$refs.aboutHotel.clientHeight >
            window.scrollY
        ) {
          this.selectedMenu = "aboutHotel";
        }
        if (
          this.$refs.hotelImage.offsetTop < window.scrollY &&
          this.$refs.hotelImage.offsetTop + this.$refs.hotelImage.clientHeight >
            window.scrollY
        ) {
          this.selectedMenu = "hotelImage";
        }
      }
    },
    toggleBodyClass(addRemoveClass, className) {
      const el = document.body;
      if (addRemoveClass === "addClass") {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },
    backToPreviousPage() {
      this.$router.go(-1);
    },
    reserveButtonClick() {
      this.$emit("reserveButtonClick");
    },
    loadMoreComments(page) {
      console.log(page);
      this.forcePage = page;
      this.$emit("loadMoreComments", page);
      this.commentPage = page;
    },
  },
};
</script>
<style scoped>
.single-hotel-mobile {
  text-align: right;
}
@media screen and (min-width: 767.98px) {
  .single-hotel-mobile {
    display: none;
  }
}
@media screen and (max-width: 767.98px) {
  .single-hotel-desktop {
    display: none;
  }
  .single-hotel-mobile {
    display: block !important;
  }
  .mobile-slider {
    height: 250px;
  }
  .single-hotel-mobile__card {
    min-height: 390px;
  }
}
@media screen and (max-width: 600px) {
  .date-picker {
    width: 100% !important;
    padding: 0px 10px;
    margin-top: 20px;
  }
}
.slider-background {
  border-radius: 15px;
}
.image-slider {
  width: 645px;
}
.big-slider {
  width: 100% !important;
  height: 380px !important;
  background-color: #bbbbbb;
  border-radius: 16px;
  object-fit: cover;
}
.slider-background {
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #bbbbbb;
  opacity: 0.5;
  transition: opacity 0.5s 0.3s;
}
.is-current .slider-background {
  opacity: 1 !important;
}
.custom-container {
  direction: rtl;
  padding: 0px 45px 30px;
}
.similar-hotel-container {
  max-width: 1200px;
  margin: 0 auto;
  direction: rtl;
  padding: 0px 45px 50px 45px;
}
.single-hotel-simalar__title {
  font-style: normal;
  font-weight: 500;
  font-size: 21px;
  line-height: 33px;
  display: flex;
  align-items: center;
  text-align: right;
  color: #333333;
}
.hotel-card {
  width: 353px;
  height: 363px;
  margin: 5px;
  border-radius: 10px !important;
  border: 1px solid #cccccc;
}
.hotel-title__name {
  font-weight: 600;
  font-size: 23px;
  line-height: 36px;
  color: #333333;
}
.hotel-route {
  font-size: 15px;
  line-height: 23px;
  color: #828282;
  margin-bottom: 10px;
  display: flex;
}
.hotel-route svg {
  margin: 8px;
  margin-bottom: 0px;
}
.hotel-title__star {
  color: #ffcd4f;
}
.hotel-star {
  color: #828282;
  font-size: 14px;
}
.hotel-rate-comment__comment,
.hotel-rate-comment__rate {
  background: #fcfcfc;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 10px;
  width: 100px;
  height: 84px;
  cursor: pointer;
}
.hotel-rate-comment__comment {
  margin-left: 10px;
}
.hotel-rate-comment__comment span {
  font-size: 27px;
  text-align: center;
  color: #4f4f4f;
}
.hotel-rate-comment__comment {
  font-size: 12px;
  color: #828282;
}
.hotel-rate-comment__rate span {
  color: #1899a7;
}
.hotel-rate-comment__rate span:last-child {
  font-weight: 600;
  font-size: 30px;
}
.hotel-rate-comment__rate span:first-child {
  font-size: 16px;
}
.hotel-image-list {
  direction: ltr;
  margin-top: 4px;
}
.hotel-image-list__item {
  cursor: pointer;
  width: calc(100% / 10);
  height: 60px;
  padding: 2.5px;
}
.hotel-image-list__item__img {
  background-size: cover;
  border-radius: 5px;
  background-color: #bbbbbb;
}
.hotel-image__list__show-all {
  font-weight: 600;
  font-size: 17px;
  text-align: center;
  color: #f4f4f4;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.single-hotel-info {
  background: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 15px;
}
.single-hotel-info {
  width: 425px;
  margin-right: auto;
  height: 505px;
  overflow: hidden;
}
.seller-list__item {
  width: 144px;
  height: 44px;
  background: #eb384d;
  border-radius: 22px;
  margin-right: auto;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 15px;
  line-height: 23px;
  margin-left: 20px;
  cursor: pointer;
}
.single-hotel-info__price {
  margin: 20px 0px;
}
.single-hotel-info__price-price {
  margin-right: 25px;
}
.single-hotel-info__price-price span:first-child {
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  color: #eb384d;
}
.single-hotel-info__price-price span:last-child {
  font-weight: normal;
  font-size: 13px;
  text-align: right;
  color: #4f4f4f;
}
.single-hotel-info__price-seller {
  font-size: 14px;
  text-align: right;
  color: #828282;
  margin-right: 25px;
}
hr {
  border-top: 1px solid #dddddd !important;
  margin-right: 10px;
  margin-left: 10px;
}
.mobile-important-place {
  max-height: 400px;
  overflow: auto;
  margin: 0px 15px;
  margin-bottom: 20px;
}
.mobile-important-place__item {
  padding: 10px 5px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
}
.mobile-important-place__item:nth-child(odd) {
  border-left: 1px solid #f2f2f2;
}
.mobile-important-place__item:nth-child(odd):last-child {
  border-bottom: none;
}
.mobile-important-place__item span:first-child {
  font-size: 12px;
  color: #1d1d1d;
  width: 75%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
}
.mobile-important-place__item span:last-child {
  font-size: 12px;
  color: #979999;
}
.nearByPlace__title {
  font-weight: 600;
  font-size: 15px;
  display: flex;
  align-items: center;
  text-align: right;
  color: #333333;
}
.nearPlace-show-more {
  font-size: 14px;
  color: #828282;
  position: relative;
  padding-left: 21px;
  cursor: pointer;
}
.nearPlace-map {
  font-weight: 600;
  font-size: 14px;
  color: #15bbcc;
  cursor: pointer;
}
.nearPlace-show-more::after {
  content: "";
  background: #dddddd;
  width: 1px;
  height: 20px;
  margin-right: 10px;
  position: absolute;
  left: 11px;
}
.single-hotel-info__address {
  font-weight: normal;
  font-size: 13.5px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: right;
  color: #828282;
  margin: 10px 20px;
}
.single-hotel-info__introduction {
  margin-right: 25px;
  margin-left: 20px;
}
.single-hotel-info__introduction__title {
  font-weight: 600;
  font-size: 15px;
  text-align: right;
  color: #333333;
  margin-top: 18px;
  margin-bottom: 10px;
}
.single-hotel-info__introduction__text {
  overflow: auto;
  font-size: 14.5px;
  color: #828282;
  line-height: 29px;
  text-align: justify;
  padding-left: 30px;
  margin-bottom: 10px;
}
::-webkit-scrollbar {
  width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f2f2f2;
  border-radius: 2px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #4f4f4f;
  border-radius: 2px;
}
.single-hotel-amenities__title {
  font-weight: 600;
  font-size: 19px;
  color: #333333;
  text-align: right;
}
.single-hotel-amenities {
  margin: 40px 0px;
  background: #ffffff;
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  padding: 40px 0px;
}
.single-hotel-amenities__item {
  width: calc(100% / 5);
  padding: 7.5px;
}
.single-hotel-amenities__item div {
  background: #f7f7f7;
  border-radius: 15px;
  width: 100%;
  padding: 18px 20px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #4f4f4f;
}
.single-hotel-amenities__item span {
  margin: 0 auto;
}
.showAllAmeneties {
  font-weight: 600;
  font-size: 15px;
  line-height: 23px;
  display: flex;
  align-items: center;
  color: #eb384d;
  cursor: pointer;
}
.single-hotel-rooms__title {
  font-weight: 600;
  font-size: 19px;
  display: flex;
  align-items: center;
  text-align: right;
  color: #333333;
}
.single-hotel-rooms__group {
  background: #ffffff;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 15px;
  padding-bottom: 20px;
}
.single-hotel-rooms__group {
  background: #ffffff;
  border-bottom: 1px solid #cccccc;
  box-sizing: border-box;
  margin: 10px 0px;
}
.room-title {
  font-weight: 600;
  font-size: 16px;
  color: #333333;
}
.room-group-capacity__item {
  position: relative;
  padding: 0px 10px;
  font-size: 15px;
  color: #656565;
}
.room-group-capacity__item:not(:first-child)::before {
  content: "";
  width: 1.5px;
  height: 35px;
  background: #dde8ea;
  position: absolute;
  right: 0px;
}
.single-hotel-rooms__group__title {
  padding: 20px 30px;
}
.single-hotel-rooms__item-provider-name {
  font-size: 15px;
  text-align: right;
  color: #6d6d6d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  width: 350px;
}
.single-hotel-rooms__item-dining-service {
  width: 150px;
  text-align: right;
  font-size: 12px;
  line-height: 19px;
  color: #1899a7;
}
.single-hotel-rooms__item-provider-provider-logo {
  width: 90px;
  max-height: 40px;
}
.single-hotel-rooms__item-provider-provider-logo img {
  max-width: 90px;
  max-height: 45px;
}
.single-hotel-rooms__item-provider-price {
  font-size: 16px;
  color: #6d6d6d;
  min-width: 140px;
}
.single-hotel-rooms__item-other-day {
  background: #ffffff;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 14px;
  color: #606060;
  outline: 0px;
}
.single-hotel-rooms__item-reserve-btn {
  background: #ffffff;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 20px;
  width: 85px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #606060;
}
.single-hotel-rooms__item {
  background: #f9f9f9;
  min-height: 64px;
  padding-left: 40px;
  padding-right: 35px;
  border-bottom: 2px solid #ebeded;
}
.single-hotel-rooms__item.first-seller {
  border-bottom: 3px solid #ffffff;
}
.single-hotel-rooms__item:nth-child(2) {
  border-top: 1px solid #e3e3e3;
  margin-top: 0px;
}
.single-hotel-rooms__item:last-child {
  border-bottom: 1px solid #e3e3e3;
  margin-bottom: 0px;
}
.single-hotel-nearbyPlace-map-box {
  height: 440px;
  background: #ffffff;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 15px;
  width: 100%;
  padding: 20px 20px;
}
.single-hotel-nearbyPlace-map-box__map {
  width: 530px;
  position: relative;
}
.single-hotel-nearbyPlace-map-box__map .open-map-modal {
  position: absolute;
  right: 0px;
  z-index: 1;
  bottom: 0px;
  background: #fcfcfc;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 23px;
  height: 30px;
  width: 30px;
  border: none;
  margin: 15px;
}
.single-hotel-nearbyPlace-map-box__distance {
  width: 510px;
  overflow: auto;
  direction: ltr;
  padding-right: 15px;
}
.single-hotel-nearbyPlace-map-box__distance__count {
  /* line-height: 44px; */
  min-width: 70px;
  position: relative;
}

.single-hotel-nearbyPlace-map-box__distance__title span:first-child {
  font-size: 14px;
  color: #888888;
}
.single-hotel-nearbyPlace-map-box__distance__title span:last-child {
  font-size: 14px;
  color: #333333;
}
.single-hotel-nearbyPlace-map-box__distance__count span {
  position: relative;
  font-size: 14px;
  color: #888888;
}
.single-hotel-nearbyPlace-map-box__distance__count::before {
  position: absolute;
  content: "";
  border-right: 1px solid #f0f0f0;
  height: 100%;
  right: -10px;
}
.single-hotel-nearbyPlace__title {
  font-weight: 600;
  font-size: 19px;
  color: #333333;
}
.single-hotel-comment-rate {
  background: #ffffff;
  border-radius: 10px;
  max-width: 900px;
  width: 900px;
}
.single-hotel-comment-rate__box {
  border-radius: 10px;
  height: 60px;
  min-width: 80px;
  color: white;
  font-size: 38px;
  margin-left: 15px;
}
.single-hotel-comment-rate__rate {
  font-size: 15px;
  color: #808080;
  margin-left: 20px;
}
.single-hotel-comment-rate__new-comment p {
  font-size: 15px;
  line-height: 40px;
  text-align: right;
  color: #4f4f4f;
}
.single-hotel-comment-rate__new-comment button {
  border: 2px solid #eb384d;
  border-radius: 22px;
  background: white;
  color: #eb384d;
  padding: 10px 22px;
  font-weight: 500;
  font-size: 14px;
}
.single-hotel-comment-rate__provider-rate {
  max-width: 300px;
  padding-left: 50px;
  margin-left: 50px;
}
.single-hotel-comment-rate__provider-rate__item {
  font-size: 14px;
  line-height: 30px;
  text-align: right;
  color: #808080;
}
.single-hotel-rule-container {
  background: #ffffff;
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  padding: 40px 0px;
}
.single-hotel-rule-text {
  align-self: baseline;
  background: #fbfbfb;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 10px;
  width: calc(100% - 245px - 20px);
  padding: 20px 30px;
  margin-right: 20px;
}
.single-hotel-rule-text p {
  font-size: 15px;
  line-height: 40px;
  color: #4f4f4f;
  text-align: right;
  margin-bottom: 0 !important;
}
.single-hotel-time {
  background: #fbfbfb;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 10px;
  width: 245px;
}
.single-hotel-time div:last-child {
  border-top: 1px solid #cccccc;
}
.single-hotel-time div {
  padding: 20px 30px;
}
.single-hotel-time__time {
  font-weight: 600;
  font-size: 22px;
  color: #eb384d;
}
.single-hotel-time__title {
  font-size: 15px;
  color: #4f4f4f;
}
.price-calendar-list {
  width: 100%;
  height: 0;
  overflow: hidden;
  transition: height 0.2s ease-in-out;
}
.active-price-calendar-list {
  height: 110px;
}
.first-seller {
  background: #fcf6f6 !important;
  position: relative;
}
.first-seller::before {
  content: "";
  position: absolute;
  width: 5px;
  height: 100%;
  background: #eb384d;
  border-radius: 0px 5px 5px 0px;
  right: -6px;
}
.first-seller::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 100%;
  background: #eb384d;
  border-radius: 5px 0px 0px 5px;
  left: -6px;
}
.first-seller .single-hotel-rooms__item-reserve-btn {
  background: #eb384d;
  border-radius: 20px;
  color: white !important;
  font-weight: 600;
  font-size: 16px;
  border: none;
}
.first-seller .single-hotel-rooms__item-reserve-btn svg path {
  fill: white;
}
.first-seller .single-hotel-rooms__item-other-day {
  background: #ffffff;
  border: 1px solid #eb384d;
  box-sizing: border-box;
  border-radius: 20px;
  color: #eb384d;
  font-size: 14px;
  font-weight: 600;
}
.first-seller .single-hotel-rooms__item-other-day svg path {
  fill: #eb384d;
}
.first-seller .single-hotel-rooms__item-provider-price {
  font-weight: 600;
  color: #eb384d;
}
.first-seller .single-hotel-rooms__item-provider-name {
  font-weight: 600;
  font-size: 15px;
  color: #333333;
}
.single-hotel-comment__list {
  background: #ffffff;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 5px 5px 15px 15px;
  margin-top: 10px;
  margin-bottom: 40px;
}
.more-comments {
  font-weight: 600;
  font-size: 15px;
  line-height: 23px;
  color: #eb384d;
  text-align: center;
  padding-bottom: 40px;
  margin-top: 20px;
  cursor: pointer;
}
.single-hotel-comment-rate__header {
  font-size: 20px;
  font-weight: 500;
  line-height: 31px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 25px;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 15px;
}
.trip-type span {
  padding: 8px 15px;
  background: #f2f2f2;
  border-radius: 8px;
  margin-left: 5px;
  color: #b3b3b3;
  font-size: 14px;
  cursor: pointer;
}
.add-commnet-wrapper {
  padding: 0px 25px;
  padding-bottom: 25px;
}
.trip-type-wrapper {
}
.add-commnet-wrapper .title {
  margin-bottom: 14px;
  font-size: 16px;
}
.rating-text {
  background: #eb384d;
  color: #ffffff;
  font-size: 12px;
  padding: 8px;
  position: relative;
  margin-right: 8px;
}
.rating-text-arrow {
  top: 5px;
  width: 0;
  border-top: 13px solid transparent;
  border-bottom: 13px solid transparent;
  border-left: 13px solid #eb384d;
  position: absolute;
  right: -11px;
}
.comment-box {
  margin-top: 25px;
}
.comment-box textarea {
  background: #f7f7f7;
  border-radius: 8px;
  min-height: 220px;
  border: none;
  width: 100%;
  padding: 15px;
}
.comment-box ::placeholder {
  color: #b3b3b3;
  font-size: 14px;
}
.add-comment-btn {
  width: 200px;
  height: 50px;
  background: #eb384d;
  border-radius: 8px;
  color: #ffffff;
  font-size: 16px;
  border: none;
  margin-top: 30px;
}
@media only screen and (max-width: 1200px) {
  .image-slider {
    width: 55%;
  }
  .single-hotel-info {
    width: 40%;
  }
}
.date-picker {
  width: 430px;
  margin-bottom: 20px;
}
.spinner > div {
  width: 10px;
  height: 10px;
  background-color: #eb384d;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
.custom-modal {
  position: fixed;
  background: rgba(28, 28, 28, 0.5);
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;
}

.modal-container {
  border-radius: 7px;
  position: relative;
  background: white;
  width: 77%;
  padding: 3em 65px;
  padding-top: 0em;
}
.vue-map-container {
  border: 2px solid #b8c7dc;
  border-radius: 7px;
}
.hotel-name p {
  font-size: 18px;
  margin-top: 16px;
  font-weight: 600;
  line-height: 31px;
}
.hotel-name svg {
  margin-left: 7px;
}
.single-hotel-mobile {
  background: white;
}
.mobile-slider {
  width: 100%;
  height: 250px;
}
.single-hotel-mobile__details {
  text-align: right;
  background: white;
  display: none;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 1003;
  overflow: auto;
  border-radius: 0;
}
.single-hotel-mobile .slider-background {
  border-radius: 10px 10px 0px 0px;
}
.single-hotel-mobile__card {
  text-align: right;
}
.single-hotel-mobile__card__info {
  background: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 0px 0px 10px 10px;
  padding: 0px 15px;
  padding-top: 14px;
}
.single-hotel-mobile__card__info__address span {
  font-size: 11px;
  color: #b1b1b1;
}
.single-hotel-mobile__card__info__title {
  font-weight: 600;
  font-size: 15px;
  color: #1d1d1d;
}
.single-hotel-mobile__card__info__rate {
  font-size: 14px;
  color: #1899a7;
  background: #f1f9fa;
  border-radius: 5px;
  min-width: 43px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.single-hotel-mobile__card__info__comment-count {
  font-size: 11px;
  color: #b1b1b1;
  margin-top: 5px;
}
.single-hotel-mobile__card__info__provider-count {
  font-size: 11px;
  color: #4f4f4f;
}
.single-hotel-mobile__card__info__seller-info__price {
  font-weight: 600;
  font-size: 22px;
  color: #eb384d;
}
.single-hotel-mobile__card__info__seller-info__currency {
  font-size: 11px;
  color: #eb384d;
}
.single-hotel-mobile__card__info__seller-info__name {
  font-size: 11px;
  color: #1d1d1d;
}
.single-hotel-mobile__card__info__seller-btn {
  background: #eb384d;
  border-radius: 20px;
  font-weight: bold;
  font-size: 13px;
  color: #ffffff;
  border: none;
  height: 35px;
  margin-right: auto;
  padding: 0px 10px;
}
.single-hotel-mobile__card__info__seller-btn svg {
  margin-right: 8px;
  margin-top: 2px;
}
.single-hotel-mobile__card__info__line {
  margin-top: 12px !important;
  margin-bottom: 8px !important;
  border-top: 1px solid #eeeeee !important;
}
.single-hotel-mobile__top-text {
  font-size: 13px;
  text-align: right;
  color: #b3b3b3;
  margin: 15px 0px;
}
.single-hotel-mobile__top-text svg {
  margin-left: 10px;
}
.mobile-top-info {
  background: #f5f8fa;
  padding: 10px 20px;
  border-bottom: 1px solid #eeeeee;
  min-height: 55px;
}
.mobile-top-info__name {
  margin-right: 15px;
  font-weight: 600;
  font-size: 15px;
  color: #1d1d1d;
}
.mobile-top-info__name a {
  color: #1d1d1d;
}
.mobile-top-info__price {
  margin-right: auto;
}
.mobile-top-info__price span:first-child {
  font-weight: 600;
  font-size: 19px;
  color: #1d1d1d;
}
.mobile-top-info__price span:last-child {
  font-size: 11px;
  color: #1d1d1d;
}
.mobile-top-info__list {
  height: 42px;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid #eeeeee;
  display: flex;
  background: #f5f8fa;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  color: #656565;
}
.mobile-top-info__list-item {
  position: relative;
  width: 25%;
  text-align: center !important;
  display: flex;
  justify-content: center;
  height: 103%;
  align-items: center;
  cursor: pointer;
}
.mobile-top-info__list-item::before {
  content: "";
  background: #eaeaea;
  width: 1.5px;
  position: absolute;
  height: 30px;
  right: 0px;
}
.mobile-top-info__list-item__active {
  color: #15bbcc !important;
  border-bottom: 2px solid #15bbcc !important;
  font-weight: bold;
}
.single-hotel-info-tab__hotel-name {
  font-weight: 600;
  font-size: 18px;
  color: #1d1d1d;
}
.single-hotel-info-tab__average-rate {
  background: #f1f9fa;
  border: 1px solid #1899a7;
  box-sizing: border-box;
  border-radius: 5px;
  width: 40px;
  height: 40px;
  font-size: 19px;
  color: #1899a7;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.single-hotel-info-tab__rate-level {
  font-size: 12px;
  color: #1899a7;
}
.single-hotel-info-tab__comments-count {
  font-size: 9px;
  color: #666666;
  margin-top: 4px;
}
.single-hotel-seller-tab-title {
  font-weight: 600;
  font-size: 15px;
  color: #1d1d1d;
  text-align: right;
  border-top: 1px solid #f2f2f2;
  padding: 0px 10px;
  padding-top: 19px;
  margin: 0px 5px;
  margin-top: 10px;
}
.hotel-average-rate {
  margin: 0px 22px 0px 12px;
  border-radius: 5px;
  width: 70px;
  height: 53px;
  color: white;
  font-weight: 600;
  font-size: 26px;
}
.comments-number {
  font-size: 14px;
  color: #1899a7;
}
.hotel-average-text {
  font-weight: 600;
  font-size: 17px;
  color: #1d1d1d;
}
.cheapest-seller-mobile {
  font-size: 11px;
  line-height: 20px;
  color: #b1b1b1;
}
.cheapest-seller-rate {
  padding: 8px;
  background: #f1f9fa;
  border-radius: 10px;
  height: 38px;
  margin: 0px 5px;
}
.cheapest-seller-rate span:first-child {
  font-weight: 600;
  font-size: 15px;
  color: #1d1d1d;
}
.cheapest-seller-rate span:last-child {
  font-size: 13px;
  color: #1899a7;
}
.single-hotel-mobile__details__navbar {
  position: fixed;
  z-index: 10;
  width: 100%;
  background: #f5f8fa;
}
.single-hotel-mobile__details__images {
  padding-top: 110px;
  min-height: 467px;
}
.single-hotel-search {
  margin: 28px 0px;
  background: #fafafa;
  border-bottom: 1px solid #eeeeee;
}
.broadcrumb-hotel-name {
  color: #bdbdbd;
}
.closeImages {
  background: none;
  border: none;
  color: #eb384d;
  margin-left: auto;
  font-size: 13px;
  font-weight: 600;
}
.closeImages:focus {
  outline: none !important;
}
.slider-image {
  object-fit: cover;
  margin: 0 auto;
}
.mobile-image-list {
  direction: ltr;
  padding: 0px 6px 0px 10px;
  margin: 13px 7px;
  height: calc(100vh - 426px);
  overflow: auto;
}
.mobile-image-list__item {
  width: 20%;
  padding: 3px;
}
.mobile-image-list__item__img {
  background-size: cover;
  border-radius: 5px;
  height: 0px !important;
  padding-bottom: 100%;
  position: relative;
}
.mobile-image-list__item__img img {
  margin: 0 auto;
  position: absolute;
  top: calc(50% - 12px);
  right: calc(50% - 12px);
}
.single-hotel-see-more-image {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: white;
  font-weight: 600;
  position: relative;
  margin-top: calc(50% - 20px);
}
.see-less-image {
  font-size: 14px;
  color: #eb384d;
  font-weight: 600;
  text-align: left;
  direction: ltr;
  margin-left: 20px;
}
.single-hotel-search_container {
  padding-bottom: 0px !important;
}
.single-hotel-search {
  margin-bottom: 20px !important;
}
.rtl {
  direction: rtl;
}
.single-hotel-nearbyPlace-map-box__distance::-webkit-scrollbar {
  border-radius: 10px;
}
.single-hotel-nearbyPlace-map-box__distance::-webkit-scrollbar-track {
  border-radius: 10px;
}
.single-hotel-nearbyPlace-map-box__distance::-webkit-scrollbar-thumb {
  background-color: #4f4f4f;
  border-radius: 10px;
}
.single-hotel-nearbyPlace-map-box__distance__row {
  padding: 0px 20px;
}
.single-hotel-nearbyPlace-map-box__distance__row:hover {
  background: #f4f4f4;
  border-radius: 10px;
}
.single-hotel-nearbyPlace-map-box__distance__row:hover
  .single-hotel-nearbyPlace-map-box__distance__count::before {
  display: none;
}
.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading-spinner,
.loading-spinner:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loading-spinner {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 0.8em solid transparent;
  border-right: 0.8em solid transparent;
  border-bottom: 0.8em solid transparent;
  border-left: 0.8em solid #eb384d;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rating .star {
  width: 33px;
  height: 33px;
  display: inline-block;
  border: 3px solid #15bbcc;
  border-radius: 50%;
  margin-left: 5px;
  padding: 3px;
  background-clip: content-box;
  cursor: pointer;
}
.rating .star.filled {
  background-color: #15bbcc;
}
.single-hotel-comment-box {
  padding: 35px 30px;
  background: white;
  border-radius: 15px 15px 3px 3px;
  border: 1px solid #cccccc;
}
.add-new-comment-btn {
  color: #eb384d;
  font-size: 16px;
  border: 1px solid #eb384d;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 13px 43px;
}
.comments-mobile-header {
  padding: 0px 18px;
}
.selected-trip-type {
  background: #ffe6e8 !important;
  border: 1px solid #eb384d;
  color: #eb384d !important;
}
.empty-state-text {
  font-size: 19px;
  line-height: 32px;
  text-align: right;
  color: #4d4d4d;
  margin-right: 50px;
}
@media only screen and (max-width: 768px) {
  ::v-deep .arrow-day {
    background: unset !important;
  }
  ::v-deep .single-hotel-page-datepicker .dates-wrapper {
    background: #f8f8f8 !important;
  }
  ::v-deep .arrow-day svg {
    fill: #1a6168 !important;
  }
  .trip-type-wrapper {
    margin-top: 25px;
  }
  .rating .star {
    width: 39px;
    height: 39px;
  }
  .add-new-comment-btn {
    padding: 7px 21px;
  }
  .single-hotel-comment-rate {
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }
  .custom-modal {
    padding: 0px;
  }
  .filte-comments-btn {
    background: #ffffff;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    border-radius: 8px;
    font-size: 14px;
    color: #333333;
    padding: 5px 15px;
  }
  .filte-comments-btn svg {
    margin-right: 8px;
  }
  .comments-mobile-header__title {
    margin-bottom: 20px;
    color: #333333;
    font-weight: 500;
    font-size: 19px;
    display: block;
    margin-top: 35px;
  }
  .empty-state-text {
    margin-right: 0px;
    margin-top: 35px;
    margin-bottom: 35px;
    text-align: center;
  }
  .empty-state {
    flex-direction: column;
    border: none;
    padding: 0px;
    align-items: center;
  }
  .empty-state .add-new-comment-btn {
    margin: auto !important;
  }
}
@media only screen and (max-width: 370px) {
  .trip-type span {
    font-size: 13px;
    padding: 5px 10px;
  }
}
</style>
