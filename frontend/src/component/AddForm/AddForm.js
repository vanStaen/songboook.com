import { React } from 'react';
import { Modal, Form, Input, Radio, notification } from 'antd';
import axios from 'axios';

import './AddForm.css';

const AddForm = (props) => {

    const handleAddSong = (values) => {
        const dataRequest = { artist: values.artist, song: values.song }
        if (values.type === "bass") { dataRequest.bass = true; }
        if (values.type === "piano") { dataRequest.piano = true; }
        if (values.link) { dataRequest.link = values.link; }
        if (values.picurl) { dataRequest.picurl = values.picurl; }
        if (values.videourl) { dataRequest.videourl = values.videourl; }
        postAddSong(dataRequest);
        props.setShowAddForm(false);
    };

    const postAddSong = (data) => {
        console.log("token fo bearer: ", props.token)
        async function postNew(data) {
            const response = await axios({
                url: process.env.REACT_APP_API_URL + "songbook",
                method: 'POST',
                data: data,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + props.token,
                },
            });
            if ((response.status !== 200) & (response.status !== 201)) {
                throw new Error("Error!");
            }
            const patchResult = await response.data;
            return patchResult;
        }
        // post new Entries
        postNew(data).then((resData) => {
            console.log(resData);
            notification.success({ description: `New song successfully posted!`, });
            props.setNewSongAdded(true);
        }
        ).catch(error => {
            notification.error({ description: `Unauthorized! Please login.`, });
            console.log("error", error.message);
        });
    }

    const handleCancel = () => {
        props.setShowAddForm(false);
    };

    const [form] = Form.useForm();

    return (
        <>
            <Modal
                visible={props.showAddForm}
                onCancel={handleCancel}
                className="addFormModal"
                centered={true}
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            form.resetFields();
                            handleAddSong(values);
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="addSongForm"
                    initialValues={{
                        type: 'guitar',
                    }}
                >
                    <Form.Item
                        name="artist"
                        label="Artist, Band or Composer"
                        rules={[
                            {
                                required: true,
                                message: 'Please input at least the name of the artist!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="song"
                        label="Song name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input at least the name of the song!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="link"
                        label="Tabs, Notes or Chords"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="picurl"
                        label="Link to the album cover"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="videourl"
                        label="Link to the youtube video"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="type" className="collection-create-form_last-form-item">
                        <Radio.Group>
                            <Radio value="guitar">Guitar</Radio>
                            <Radio value="bass">Bass</Radio>
                            <Radio value="piano">Piano</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    );

}

export default AddForm;

/*
"link":
"artist":
"song":
"picurl":
"videourl"
*/