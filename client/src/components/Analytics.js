import React from "react";
import { Progress } from "antd";
import "../styles/Analytics.css";

const Analytics = ({ allTransection }) => {
  //category
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
  ];

  //total transection
  const totalTransection = allTransection.length;
  const totalIncomeTransection = allTransection.filter(
    (transection) => transection.type === "income"
  );
  const totalExpenseTransection = allTransection.filter(
    (transection) => transection.type === "exp"
  );
  const totalIncomePercent =
    (totalIncomeTransection.length / totalTransection) * 100;
  const totalExpensePersent =
    (totalExpenseTransection.length / totalTransection) * 100;

  //total turnover
  const totalTurnover = allTransection.reduce(
    (acc, transection) => acc + transection.amount,
    0
  );

  const totalIncomeTurnover = allTransection
    .filter((transection) => transection.type === "income")
    .reduce((acc, transection) => acc + transection.amount, 0);

  const totalExpenseTurnover = allTransection
    .filter((transection) => transection.type === "exp")
    .reduce((acc, transection) => acc + transection.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transection : {totalTransection}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income : {totalIncomeTransection.length}
              </h5>
              <h5 className="text-danger">
                Expense : {totalExpenseTransection.length}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpensePersent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total Turnover : {totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">Income : {totalIncomeTurnover}</h5>
              <h5 className="text-danger">Expense : {totalExpenseTurnover}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpenseTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-4">
          <h4>Categorywise Income</h4>
          {categories.map((category) => {
            const amount = allTransection
              .filter(
                (transection) =>
                  transection.type === "income" &&
                  transection.category === category
              )
              .reduce((acc, transection) => acc + transection.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="col-md-4">
          <h4>Categorywise Expense</h4>
          {categories.map((category) => {
            const amount = allTransection
              .filter(
                (transection) =>
                  transection.type === "exp" &&
                  transection.category === category
              )
              .reduce((acc, transection) => acc + transection.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalExpenseTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Analytics;
