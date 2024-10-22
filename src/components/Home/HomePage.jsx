import React from "react";
import { useMediaQuery } from "react-responsive";

const HomePage = () => {
    const arrSymbol = [
        {
            hinhAnh: "./img/img1.png",
            title: "Ở trong ngôi nhà Purple Rain của Prince",
            owner: "Chủ nhà/Người tổ chức: Wendy và Lisa",
            availability: "Nhận đặt phòng từ tháng 9",
        },
        {
            hinhAnh: "/img/img2.png",
            title: "Thư giãn tại phòng khách cùng Doja",
            owner: "Chủ nhà/Người tổ chức: Doja Cat",
            availability: "Ra mắt vào tháng 10",
        },

        {
            hinhAnh: "/img/img3.png",
            title: "Tiệc ngủ ở Nhà búp bê Polly Pocket",
            owner: " Chủ nhà: Polly Pocket",
            availability: "Đã hết phòng",
        },
        {
            hinhAnh: "/img/img4.png",
            title: "Buổi hẹn chơi chung tại Nhà búp bê Polly Pocket",
            owner: "Chủ nhà/Người tổ chức: Polly Pocket",
            availability: "Đã hết phòng",
        },
        {
            hinhAnh: "/img/img7.jpeg",
            title: "Thăng hạng VIP cùng Kevin Hart",
            owner: "Chủ nhà/Người tổ chức: Kevin Hart",
            availability: "Đã hết phòng",
        },
        {
            hinhAnh: "/img/img8.jpeg",
            title: "Huấn luyện tại dinh thự X-Mansion",
            owner: "Chủ nhà/Người tổ chức: Jubilee",
            availability: "Đã hết phòng",
        },
    ];
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const pastExperience = [
        {
            hinhAnh: "/img/img9.jpeg",
            title: "Sống như ngôi sao Bollywood Janhvi Kapoor",
            owner: "Chủ nhà/Người tổ chức: Janhvi Kapoor",
            availability: "Đã hết phòng",
        },
        {
            hinhAnh: "/img/img10.jpeg",
            title: "Đón xem khai mạc Olympic tại Bảo tàng Orsay",
            owner: "Chủ nhà/Người tổ chức: Mathieu Lehanneur",
            availability: "Đã hết phòng",
        },
        {
            hinhAnh: "/img/img11.jpeg",
            title: "Thức dậy trong Bảo tàng d’Orsay",
            owner: "Chủ nhà/Người tổ chức: Mathieu Lehanneur",
            availability: "Đã hết phòng",
        },
        {
            hinhAnh: "/img/img12.jpeg",
            title: "Tạo nên những ký ức khó quên với Những mảnh ghép cảm xúc",
            owner: "Chủ nhà/Người tổ chức: Joy",
            availability: "Đã hết phòng",
        },
        {
            hinhAnh: "/img/img13.jpeg",
            title: "  Tự thiết kế bộ Supersuit Gia đình siêu nhân cho mình",
            owner: "Chủ nhà/Người tổ chức: Edna Mode",
            availability: "Đã hết phòng",
        },
        {
            hinhAnh: "/img/img15.jpeg",
            title: "Chơi game cùng Khaby Lame",
            owner: "Chủ nhà/Người tổ chức: Khaby Lame",
            availability: "Đã hết phòng",
        },
        {
            hinhAnh: "/img/img16.jpeg",
            title: "Nghỉ đêm tại dinh thự X-Mansion",
            owner: "Chủ nhà/Người tổ chức: Jubilee",
            availability: "Đã hết phòng",
        },
        {
            hinhAnh: "/img/img17.jpeg",
            title: "Nghỉ đêm tại Bảo tàng Ferrari",
            owner: "Chủ nhà/Người tổ chức: Marc Gené",
            availability: "Đã hết phòng",
        },
        {
            hinhAnh: "/img/img18.jpeg",
            title: "Trôi nổi trong ngôi nhà của bộ phim Vút bay (Up)",
            owner: "Chủ nhà/Người tổ chức: Carl Fredricksen",
            availability: "Đã hết phòng",
        },
        {
            hinhAnh: "/img/img20.jpeg",
            title: "Đắm mình trong biệt thự hồng của Manlena",
            owner: "Chủ nhà/Người tổ chức: Manlena",
            availability: "Đã hết phòng",
        },
        {
            hinhAnh: "/img/img19.jpeg",
            title: "Đầm lầy của Shrek",
            owner: "Chủ nhà/Người tổ chức: Shrek",
            availability: "Đã hết phòng",
        },
        {
            hinhAnh: "/img/img22.jpeg",
            title: "Chốn nghỉ ngơi mang âm hưởng HousePlant",
            owner: "Chủ nhà/Người tổ chức: Seth Rogen",
            availability: "Đã hết phòng",
        },
        {
            hinhAnh: "/img/img21.jpeg",
            title: "Quán rượu yêu thích của TedLasso",
            owner: "Chủ nhà/Người tổ chức: Mae",
            availability: "Đã hết phòng",
        },
        {
            hinhAnh: "/img/img24.jpg",
            title: "The Last Blockbuster",
            owner: "Chủ nhà/Người tổ chức: Sandi",
            availability: "Đã hết phòng",
        },
        {
            hinhAnh: "/img/img23.jpeg",
            title: "Nghỉ lễ theo phong cách 'Ở nhà một mình'",
            owner: "Chủ nhà/Người tổ chức: Buzz",
            availability: "Đã hết phòng",
        },
    ];

    return (
        <>
            <section>
                <div className="container sm:container  lg:container  2xl:container">
                    <div
                        className={`grid grid-cols-1 ${
                            isMobile && "px-7"
                        } md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-x-3 gap-y-4 md:gap-x-8 md:gap-y-14   xl:gap-x-6 xl:gap-y-14  `}
                    >
                        {arrSymbol.map((item, index) => (
                            <div
                                key={index}
                                className="max-h-80 mb-16 mt-6 md:mt-0"
                            >
                                <img
                                    className="w-full h-full object-cover rounded-2xl"
                                    src={item.hinhAnh}
                                    alt=""
                                />
                                <h3 className="font-semibold mt-3">
                                    {item.title}
                                </h3>
                                <h4>{item.owner}</h4>
                                <h5 className="font-semibold ">
                                    {item.availability}
                                </h5>
                            </div>
                        ))}
                    </div>
                    <h2 className="text-3xl mt-16 font-semibold">
                        Trải nghiệm đã qua
                    </h2>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
                            isMobile && "px-7"
                        }  gap-x-3 gap-y-4 md:gap-x-8 md:gap-y-14  xl:gap-x-6 xl:gap-y-14  mt-4`}
                    >
                        {pastExperience.map((item, index) => (
                            <div
                                key={index}
                                className="max-h-80 mb-20 mt-6 md:mt-0"
                            >
                                <img
                                    className="w-full h-full object-cover rounded-2xl"
                                    src={item.hinhAnh}
                                    alt=""
                                />
                                <h3 className="font-semibold mt-3 ">
                                    {item.title}
                                </h3>
                                <h4>{item.owner}</h4>
                                <h5 className="font-semibold ">
                                    {item.availability}
                                </h5>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
