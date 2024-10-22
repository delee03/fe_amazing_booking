import React from "react";
import { Alert, Flex, Spin } from "antd";
const contentStyle = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
};

const content = <div style={contentStyle} />;
const SpinnerCustom = ({ title = "Đang tải" }) => {
    return (
        <Flex>
            <Spin tip={title} size="large" fullscreen={true}>
                {content}
            </Spin>
        </Flex>
    );
};

export default SpinnerCustom;
