import React from "react";
import Header from "../UI/Header/Header"

function Sale(props) {
    return (
        <div>
            <Header/>
            <div className="content">
                <img
                    className="banner_img"
                    src="https://cdn0.fahasa.com/media/wysiwyg/Thang-03-2022/set_1920x400_bo1_FS_T3.png"
                    alt=""
                />
            </div>
            <div className="content">
                <div className=" logo-flashsale-and-countdown">
                    <div className="logo-flashsale-and-countdown-item">
                        <div className="logo-flashsale">
                            <img
                                src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/ico_flashsale@3x.png"
                                alt=""
                            />{" "}
                            FLASH SALE |
                        </div>
                        <div className="countdown">
                            <div className="time-countdown">
                                <p id="hours"></p>
                            </div>
                            <div className="time-countdown">
                                <p id="minutes"></p>
                            </div>
                            <div className="time-countdown">
                                <p id="seconds"></p>
                            </div>
                        </div>
                    </div>

                    <div className="review-all">
                        <a href="./list-Product.html">
                            Xem tất cả <i className="fas fa-chevron-right"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="list-product__hour-sale">
                <ul className="list-product__hour-sale-list">
                    <li className="list-product__hour-sale-items-hour">
                        <div id="list-product__hour-sale-items-hour"></div>
                        <p>Đang diễn ra</p>
                    </li>
                    <li className="list-product__hour-sale-items-hour">
                        <div id="list-product__hour-sale-items-hour-second"></div>
                        <p>sắp diễn ra</p>
                    </li>
                    <li className="list-product__hour-sale-items-hour">
                        <div id="list-product__hour-sale-items-hour-third"></div>
                        <p>sắp diễn ra</p>
                    </li>
                    <li className="list-product__hour-sale-items-hour">
                        <div id="list-product__hour-sale-items-hour-fourth"></div>
                        <p>sắp diễn ra</p>
                    </li>
                    <li className="list-product__hour-sale-items-hour">
                        <div id="list-product__hour-sale-items-hour-fifth"></div>
                        <p>sắp diễn ra</p>
                    </li>
                </ul>
            </div>

            <div className="product">
                <ul className="list-product">
                    <li className="product-items product-items2">
                        <img
                            src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/c/o/conan-hoat-hinh-mau---ke-hanh-phap-zero-tap-2.jpg"
                            alt=""
                        />
                        <div className="product-info">
                            <p className="product-title">
                                Tuyển tập conan hay nhất
                            </p>
                            <h3 className="price-sale">3.000đ</h3>
                            <p className="primary-price">30.000đ</p>
                        </div>
                    </li>
                    <li className="product-items product-items2">
                        <img
                            src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/c/o/conan---hoat-hinh-mau---am-muu-tren-bien_-tap-2.jpg"
                            alt=""
                        />
                        <div className="product-info">
                            <p className="product-title">
                                Tuyển tập conan hay nhất
                            </p>
                            <h3 className="price-sale">3.000đ</h3>
                            <p className="primary-price">30.000đ</p>
                        </div>
                    </li>
                    <li className="product-items product-items2">
                        <img
                            src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/t/h/tham-tu-lung-danh-conan---me-cung-trong-thanh-pho-co---tap-1.jpg"
                            alt=""
                        />
                        <div className="product-info">
                            <p className="product-title">
                                Tuyển tập conan hay nhất
                            </p>
                            <h3 className="price-sale">3.000đ</h3>
                            <p className="primary-price">30.000đ</p>
                        </div>
                    </li>
                    <li className="product-items product-items2">
                        <img
                            src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/t/h/tham-tu-conan---hoat-hinh-mau---thu-pham-trong-doi-mat-2.jpg"
                            alt=""
                        />
                        <div className="product-info">
                            <p className="product-title">
                                Tuyển tập conan hay nhất
                            </p>
                            <h3 className="price-sale">3.000đ</h3>
                            <p className="primary-price">30.000đ</p>
                        </div>
                    </li>
                    <li className="product-items product-items2">
                        <img
                            src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/t/h/tham-tu-lung-danh-conan-_-tap-99.jpg"
                            alt=""
                        />
                        <div className="product-info">
                            <p className="product-title">
                                Tuyển tập conan hay nhất
                            </p>
                            <h3 className="price-sale">3.000đ</h3>
                            <p className="primary-price">30.000đ</p>
                        </div>
                    </li>
                    <li className="product-items product-items2">
                        <img
                            src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/t/h/tham-tu-lung-danh-conan-tuyen-tap-dac-biet---vs.kaito-kid-perfect-edition-_-tap-2_1.jpg"
                            alt=""
                        />
                        <div className="product-info">
                            <p className="product-title">
                                Tuyển tập conan hay nhất
                            </p>
                            <h3 className="price-sale">3.000đ</h3>
                            <p className="primary-price">30.000đ</p>
                        </div>
                    </li>
                    <li className="product-items product-items2">
                        <img
                            src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/i/m/image_185452.jpg"
                            alt=""
                        />
                        <div className="product-info">
                            <p className="product-title">
                                Tuyển tập conan hay nhất
                            </p>
                            <h3 className="price-sale">3.000đ</h3>
                            <p className="primary-price">30.000đ</p>
                        </div>
                    </li>
                    <li className="product-items product-items2">
                        <img
                            src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/t/h/tham-tu-lung-danh-conan-tuyen-tap-dac-biet---vs.kaito-kid-perfect-edition-_-tap-2_1.jpg"
                            alt=""
                        />
                        <div className="product-info">
                            <p className="product-title">
                                Tuyển tập conan hay nhất
                            </p>
                            <h3 className="price-sale">3.000đ</h3>
                            <p className="primary-price">30.000đ</p>
                        </div>
                    </li>

                    <li className="product-items product-items2">
                        <img
                            src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/t/h/tham-tu-conan---hoat-hinh-mau---thu-pham-trong-doi-mat-2.jpg"
                            alt=""
                        />
                        <div className="product-info">
                            <p className="product-title">
                                Tuyển tập conan hay nhất
                            </p>
                            <h3 className="price-sale">3.000đ</h3>
                            <p className="primary-price">30.000đ</p>
                        </div>
                    </li>
                    <li className="product-items product-items2">
                        <img
                            src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/i/m/image_185451.jpg"
                            alt=""
                        />
                        <div className="product-info">
                            <p className="product-title">
                                Tuyển tập conan hay nhất
                            </p>
                            <h3 className="price-sale">3.000đ</h3>
                            <p className="primary-price">30.000đ</p>
                        </div>
                    </li>
                    <li className="product-items product-items2">
                        <img
                            src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/t/h/tham-thu-conan-hoat-hinh-mau---truy-lung-to-chuc-ao-den----tap-2.jpg"
                            alt=""
                        />
                        <div className="product-info">
                            <p className="product-title">
                                Tuyển tập conan hay nhất
                            </p>
                            <h3 className="price-sale">3.000đ</h3>
                            <p className="primary-price">30.000đ</p>
                        </div>
                    </li>

                    <li className="product-items product-items2">
                        <img
                            src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/i/m/image_195509_1_16904.jpg"
                            alt=""
                        />
                        <div className="product-info">
                            <p className="product-title">
                                Tuyển tập conan hay nhất
                            </p>
                            <h3 className="price-sale">3.000đ</h3>
                            <p className="primary-price">30.000đ</p>
                        </div>
                    </li>
                    <li className="product-items product-items2">
                        <img
                            src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/c/o/conan-hoat-hinh-mau---ke-hanh-phap-zero-tap-2.jpg"
                            alt=""
                        />
                        <div className="product-info">
                            <p className="product-title">
                                Tuyển tập conan hay nhất
                            </p>
                            <h3 className="price-sale">3.000đ</h3>
                            <p className="primary-price">30.000đ</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="freeship">
                <div className="freeship_banner">
                    <h1>SĂN NGAY - MIỄN PHÍ VẬN CHUYỂN</h1>
                </div>
            </div>

            <div className="voucher">
                <div className="voucher-freeship">
                    <ul className="voucher-list">
                        <li className="voucher-item">
                            <img src="../../assets/image/Capture.png" alt=""  />
                            <div className="voucher-info">
                                <h3>MIỄN PHÍ VẬN CHUYỂN</h3>
                                <div className="sale-button">
                                    <p className="voucher-max">Tối đa 10k</p>
                                    <p>Lưu</p>
                                </div>
                                <p className="used">Đã dùng 90%</p>
                                <div className="voucher-bar"></div>
                                <div className="voucher-des">
                                    <p className="voucher-apply">
                                        Áp dụng cho đơn hàng từ 50k
                                    </p>
                                    <p>Điều kiện</p>
                                </div>
                            </div>
                        </li>
                        <li className="voucher-item">
                            <img src="../../assets/image/Capture.png" alt=""  />
                            <div className="voucher-info">
                                <h3>MIỄN PHÍ VẬN CHUYỂN</h3>
                                <div className="sale-button">
                                    <p className="voucher-max">Tối đa 30k</p>
                                    <p>Lưu</p>
                                </div>
                                <p className="used">Đã dùng 90%</p>
                                <div className="voucher-bar"></div>
                                <div className="voucher-des">
                                    <p className="voucher-apply">
                                        Áp dụng cho đơn hàng từ 250k
                                    </p>
                                    <p>Điều kiện</p>
                                </div>
                            </div>
                        </li>
                        <li className="voucher-item">
                            <img src="../../assets/image/Capture.png" alt=""  />
                            <div className="voucher-info">
                                <h3>MIỄN PHÍ VẬN CHUYỂN</h3>
                                <div className="sale-button">
                                    <p className="voucher-max">Tối đa 50k</p>
                                    <p>Lưu</p>
                                </div>
                                <p className="used">Đã dùng 90%</p>
                                <div className="voucher-bar"></div>
                                <div className="voucher-des">
                                    <p className="voucher-apply">
                                        Áp dụng cho đơn hàng từ 350k
                                    </p>
                                    <p>Điều kiện</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul className="voucher-list">
                        <li className="voucher-item">
                            <img src="../../assets/image/Capture.png" alt=""  />
                            <div className="voucher-info">
                                <h3>MIỄN PHÍ VẬN CHUYỂN</h3>
                                <div className="sale-button">
                                    <p className="voucher-max">Tối đa 10k</p>
                                    <p>Lưu</p>
                                </div>
                                <p className="used">Đã dùng 90%</p>
                                <div className="voucher-bar"></div>
                                <div className="voucher-des">
                                    <p className="voucher-apply">
                                        Áp dụng cho đơn hàng từ 50k
                                    </p>
                                    <p>Điều kiện</p>
                                </div>
                            </div>
                        </li>
                        <li className="voucher-item">
                            <img src="../../../assets/image/Capture.png" alt="" />
                            <div className="voucher-info">
                                <h3>MIỄN PHÍ VẬN CHUYỂN</h3>
                                <div className="sale-button">
                                    <p className="voucher-max">Tối đa 10k</p>
                                    <p>Lưu</p>
                                </div>
                                <p className="used">Đã dùng 90%</p>
                                <div className="voucher-bar"></div>
                                <div className="voucher-des">
                                    <p className="voucher-apply">
                                        Áp dụng cho đơn hàng từ 50k
                                    </p>
                                    <p>Điều kiện</p>
                                </div>
                            </div>
                        </li>
                        <li className="voucher-item">
                            <img src="../../assets/image/Capture.png" alt=""  />
                            <div className="voucher-info">
                                <h3>MIỄN PHÍ VẬN CHUYỂN</h3>
                                <div className="sale-button">
                                    <p className="voucher-max">Tối đa 10k</p>
                                    <p>Lưu</p>
                                </div>
                                <p className="used">Đã dùng 90%</p>
                                <div className="voucher-bar"></div>
                                <div className="voucher-des">
                                    <p className="voucher-apply">
                                        Áp dụng cho đơn hàng từ 50k
                                    </p>
                                    <p>Điều kiện</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="voucher-shop"></div>
            </div>
        </div>
    );
}

export default Sale;
