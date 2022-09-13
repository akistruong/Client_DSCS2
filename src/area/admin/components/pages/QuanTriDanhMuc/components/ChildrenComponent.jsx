import React from "react";
import { Button, Collapse, Input, Modal } from "antd";
import { useState } from "react";
const { Panel } = Collapse;
const ChildrenComponent = (props) => {
  const { value } = props;
  const [openEdit, setEdit] = useState({
    state: false,
  });
  console.log({ openEdit });
  return (
    <div>
      <Collapse>
        <Panel header={value.info.tenDanhMuc}>
          {value.children &&
            value.children.map((item) => (
              <Collapse key={item.info.id}>
                <Panel
                  showArrow={item.children.length > 0 ? true : false}
                  header={item.info.tenDanhMuc}
                  extra={
                    <>
                      <Button
                        danger
                        onClick={() => alert("Remove : " + item.label)}
                      >
                        Xóa
                      </Button>
                      <Button
                        onClick={() =>
                          setEdit({
                            id: item.info.id,
                            tenDanhMuc: item.info.tenDanhMuc,
                            state: true,
                          })
                        }
                      >
                        Sửa tên danh mục
                      </Button>
                    </>
                  }
                >
                  {item.children.length > 0 && (
                    <ChildrenComponent value={item} />
                  )}
                </Panel>
              </Collapse>
            ))}
        </Panel>
      </Collapse>
      <Modal
        visible={openEdit.state}
        onCancel={() => setEdit({ state: false })}
        onOk={() => alert(openEdit?.tenDanhMuc)}
      >
        <Input value={openEdit.tenDanhMuc} />
      </Modal>
    </div>
  );
};

export default ChildrenComponent;
