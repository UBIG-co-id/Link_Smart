import React, { useState } from 'react';
import Content from '../../layout/Content/Content';
import Head from '../../layout/Head';
import { Col, Row, Block, BlockHead, BlockBetween, BlockHeadContent, BlockTitle, BlockDes, PreviewAltCard } from '../../component/Component';

const Pembayaran = () => {
  const [sm, updateSm] = useState(false);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [paymentType, setPaymentType] = useState('fixed'); // Default value 'fixed'
  const [otherPaymentType, setOtherPaymentType] = useState('default'); // Default value 'default'
  const [dueDate, setDueDate] = useState(''); // State for due date
  const [paymentStatus, setPaymentStatus] = useState(''); // State for payment status
  const [notPaidStatus, setNotPaidStatus] = useState(''); // State for not paid status

  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
  };

  const handleOtherPaymentTypeChange = (type) => {
    setOtherPaymentType(type);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handlePaymentStatusChange = (e) => {
    setPaymentStatus(e.target.value);
  };

  const handleNotPaidStatusChange = (e) => {
    setNotPaidStatus(e.target.value);
  };

  return (
    <React.Fragment>
      <Head title="Pembayaran" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Pembayaran
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Welcome to Link Smart</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <PreviewAltCard className="card-full">
              <Row className="g-gs">
                <div className="card-title">
                  <h5 className="title">Pembayaran</h5>
                </div>
                <Col md="4">
                  <label className="form-label">Tipe Pembayaran</label>
                  <div className="d-flex">
                    <div className="form-check me-3">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="fixedPayment"
                        name="paymentType"
                        value="fixed"
                        checked={paymentType === 'fixed'}
                        onChange={() => handlePaymentTypeChange('fixed')}
                      />
                      <label className="form-check-label" htmlFor="fixedPayment">
                        Fixed Payment
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="partialPayment"
                        name="paymentType"
                        value="partial"
                        checked={paymentType === 'partial'}
                        onChange={() => handlePaymentTypeChange('partial')}
                      />
                      <label className="form-check-label" htmlFor="partialPayment">
                        Partial Payment
                      </label>
                    </div>
                  </div>

                  {/* Additional radio button for "Tipe Pembayaran Biaya Lain Default" */}
                  <label className="form-label mt-3">Tipe Pembayaran Biaya Lain Default</label>
                  <div className="d-flex">
                    <div className="form-check me-3">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="defaultOtherPayment"
                        name="otherPaymentType"
                        value="default"
                        checked={otherPaymentType === 'default'}
                        onChange={() => handleOtherPaymentTypeChange('default')}
                      />
                      <label className="form-check-label" htmlFor="defaultOtherPayment">
                        Default
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="customOtherPayment"
                        name="otherPaymentType"
                        value="custom"
                        checked={otherPaymentType === 'custom'}
                        onChange={() => handleOtherPaymentTypeChange('custom')}
                      />
                      <label className="form-check-label" htmlFor="customOtherPayment">
                        Custom
                      </label>
                    </div>
                  </div>

                  {/* Move the due date input here */}
                  <div className="form-group mt-3">
                    <label className="form-label">Tanggal Batas Pembayaran SPP</label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter Tanggal Batas Pembayaran SPP"
                      value={dueDate}
                      onChange={handleDueDateChange}
                    />
                  </div>
                </Col>
                
              </Row>
              <Row className="g-gs">
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">Teks Pesan Telah Membayar SPP</label>
                    <textarea
                      className="form-control"
                      placeholder="Enter Teks Pesan Telah Membayar SPP"
                      value={paymentStatus}
                      onChange={handlePaymentStatusChange}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="g-gs">
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">Teks Pesan Belum Membayar SPP</label>
                    <textarea
                      className="form-control"
                      placeholder="Enter Teks Pesan Belum Membayar SPP"
                      value={notPaidStatus}
                      onChange={handleNotPaidStatusChange}
                    />
                  </div>
                </Col>
              </Row>
            </PreviewAltCard>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default Pembayaran;
