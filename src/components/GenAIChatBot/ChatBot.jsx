import React, { useState } from "react";
import { Drawer, Input, List, Spin, message as antdMessage } from "antd";
import axios from "axios";

const ChatBot = ({ stateOpening, updateState }) => {
    const [messages, setMessages] = useState([]); // Lưu trữ tin nhắn
    const [inputValue, setInputValue] = useState(""); // Giá trị input
    const [loading, setLoading] = useState(false); // Trạng thái loading

    // Gửi tin nhắn lên API
    const handleSend = async () => {
        if (!inputValue.trim()) {
            antdMessage.warning("Hãy nhập nội dung trước khi gửi!");
            return;
        }

        // Thêm tin nhắn của người dùng vào danh sách
        const newMessages = [
            ...messages,
            { sender: "user", text: inputValue }, // Người gửi
        ];
        setMessages(newMessages); // Cập nhật danh sách tin nhắn
        setInputValue(""); // Xóa input

        setLoading(true); // Bật trạng thái loading

        try {
            // Gửi yêu cầu tới API
            const response = await axios.post(
                "https://wx14oaepuh.execute-api.us-east-1.amazonaws.com/dev/extract",
                { user_input: inputValue }
            );

            // Thêm tin nhắn từ Assistant vào danh sách
            const assistantMessage = {
                sender: "assistant",
                text: response.data.kb_output || "Không có phản hồi từ trợ lý.",
            };
            setMessages([...newMessages, assistantMessage]);
        } catch (error) {
            console.error("Error while sending message:", error);
            antdMessage.error("Đã xảy ra lỗi khi gửi tin nhắn!");
        } finally {
            setLoading(false); // Tắt trạng thái loading
        }
    };

    return (
        <Drawer
            title="ChatBot"
            placement="right"
            onClose={() => updateState(false)}
            open={stateOpening}
            width={400}
            bodyStyle={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            {/* Hiển thị danh sách tin nhắn */}
            <div style={{ flex: 1, overflow: "auto", marginBottom: 10 }}>
                <List
                    dataSource={messages}
                    renderItem={(message, index) => (
                        <List.Item
                            key={index}
                            style={{
                                justifyContent:
                                    message.sender === "user"
                                        ? "flex-end"
                                        : "flex-start",
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: "70%",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    color: "#fff",
                                    backgroundColor:
                                        message.sender === "user"
                                            ? "#007bff"
                                            : "#6c757d",
                                    textAlign:
                                        message.sender === "user"
                                            ? "right"
                                            : "left",
                                }}
                            >
                                {message.text}
                            </div>
                        </List.Item>
                    )}
                />

                {/* Hiển thị loading */}
                {loading && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "10px 0",
                        }}
                    >
                        <Spin size="large" />
                    </div>
                )}
            </div>

            {/* Input để nhập tin nhắn */}
            <Input.Search
                placeholder="Nhập tin nhắn..."
                enterButton="Gửi"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onSearch={handleSend}
                loading={loading} // Hiển thị trạng thái loading trên nút "Gửi"
            />
        </Drawer>
    );
};

export default ChatBot;
