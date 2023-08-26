import React, { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import { Modal } from "../../ui/Modal";
import CabinTable from "./CabinTable";
export default function AddCabins() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

/*
export default function AddCabins() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowModal((s) => !s)}>Add new Cabin</Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateCabinForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
}
*/
