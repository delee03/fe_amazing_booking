import React, { useState } from "react";
import { Button, Modal } from "antd";
const HanldeUpdateUserInfo = ({ close, isUpdate }) => {
    const [step, setStep] = useState(1);
    const [avatar, setAvatar] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const showLoading = () => {
        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };
    const handleUploadAvatar = (event) => {
        event.preventDefault();
        // Chuyển đổi dữ liệu vào formData
        let formData = new FormData();
        formData.append("formFile", avatar.file);
        let { token } = infoUser;
        console.log(token);
        nguoiDungService
            .uploadAvatar(token, formData)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    console.log(avatar);
    const handleSubmit = () => {
        setStep(step + 1);
    };
    const handleUpdateStep = () => {
        switch (step) {
            case 1:
                return (
                    <Modal
                        title={<p>Cập nhật Profile</p>}
                        footer={
                            <Button type="primary" onClick={showLoading}>
                                Reload
                            </Button>
                        }
                        loading={loading}
                        open={isUpdate}
                        onCancel={() => {
                            close();
                        }}
                    >
                        <form action="" onSubmit={handleSubmit}>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <button type="submit">Tiếp theo</button>
                        </form>
                    </Modal>
                );
            case 2:
                return (
                    <Modal
                        title={<p>Chọn Ảnh Profile</p>}
                        footer={
                            <Button type="primary" onClick={showLoading}>
                                Reload
                            </Button>
                        }
                        loading={loading}
                        open={open}
                        onCancel={close}
                    >
                        <form
                            action=""
                            onSubmit={() => {
                                close();
                            }}
                        >
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <button type="submit">Submit</button>
                        </form>
                    </Modal>
                );

            default:
                break;
        }
    };
    return <div>{handleUpdateStep()}</div>;
};

export default HanldeUpdateUserInfo;
