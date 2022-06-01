import React from "react";
import { Modal, Form, Input, Radio, notification } from "antd";
import { observer } from "mobx-react";
import axios from "axios";

import { displayStore } from "../../stores/displayStore";
import { formStore } from "../../stores/formStore";
import "./AddForm.css";

export const AddForm = observer((props) => {
  const handleAddSong = (values) => {
    const dataRequest = { artist: values.artist, song: values.song };
    formStore.setArtist(values.artist);
    formStore.setSong(values.song);
    if (values.type === "bass") {
      formStore.setType("bass");
      dataRequest.bass = true;
    }
    if (values.type === "piano") {
      formStore.setType("piano");
      dataRequest.piano = true;
    }
    if (values.level) {
      dataRequest.level = values.level;
      formStore.setLevel(values.level);
    }
    if (values.link) {
      dataRequest.link = values.link;
      formStore.setLink(values.link);
    }
    if (values.picurl) {
      dataRequest.picurl = values.picurl;
      formStore.setPicurl(values.picurl);
    }
    if (values.videourl) {
      dataRequest.videourl = values.videourl;
      formStore.setVideourl(values.videourl);
    }
    postAddSong(dataRequest);
    displayStore.setShowPage("book");
  };

  const postAddSong = (data) => {
    async function postNew(data) {
      const response = await axios({
        url: process.env.API_URL + "/song",
        method: "POST",
        data: data,
      });
      if ((response.status !== 200) & (response.status !== 201)) {
        throw new Error("Error!");
      }
      // Empty the display store
      formStore.setArtist(null);
      formStore.setSong(null);
      formStore.setType("guitar");
      formStore.setLevel(null);
      formStore.setLink(null);
      formStore.setPicurl(null);
      formStore.setVideourl(null);

      const patchResult = await response.data;
      return patchResult;
    }
    // post new Entries
    postNew(data)
      .then((resData) => {
        console.log(resData);
        notification.success({ description: `New song successfully posted!` });
        props.setNewSongAdded(true);
      })
      .catch((error) => {
        notification.error({ description: `Unauthorized! Please login.` });
        console.log("error", error.message);
      });
  };

  const handleCancel = () => {
    displayStore.setShowPage("book");
  };

  const [form] = Form.useForm();

  return (
    <>
      <Modal
        visible={true}
        onCancel={handleCancel}
        className="addFormModal"
        centered={true}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleAddSong(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="addSongForm"
          initialValues={{
            artist: formStore.artist,
            song: formStore.song,
            link: formStore.link,
            picurl: formStore.picurl,
            videourl: formStore.videourl,
            type: formStore.type,
            level: formStore.level,
          }}
        >
          <Form.Item
            name="artist"
            label="Artist, Band or Composer"
            rules={[
              {
                required: true,
                message: "Please input at least the name of the artist!",
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
                message: "Please input at least the name of the song!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="link" label="Tabs, Notes or Chords">
            <Input />
          </Form.Item>
          <Form.Item name="picurl" label="Link to the album cover">
            <Input />
          </Form.Item>
          <Form.Item name="videourl" label="Link to the youtube video">
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            className="collection-create-form_last-form-item"
          >
            <Radio.Group>
              <Radio value="guitar">Guitar</Radio>
              <Radio value="bass">Bass</Radio>
              <Radio value="piano">Piano</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="level"
            className="collection-create-form_last-form-item"
          >
            <Radio.Group>
              <Radio value="easy">Easy</Radio>
              <Radio value="medium">Medium</Radio>
              <Radio value="hard">Hard</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});
