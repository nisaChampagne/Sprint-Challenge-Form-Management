import React from 'react';
import ReactDOM from "react-dom";
import { subtract } from './register';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import FormikRegister from './register';
import "@testing-library/react/cleanup-after-each";

describe('<FormikRegister />', () => {
    it("FormikForm renders", () => {
        const div = document.createElement("div");
        ReactDOM.render(<FormikRegister />, div);
        ReactDOM.unmountComponentAtNode(div);
      });
      
      it("submit button clicked", () => {
        const { getByText } = render(<FormikRegister />);
        const submitButton = getByText(/Submit/i);
        fireEvent.click(submitButton);
        });
      
      test("subtract function", () => {
        expect(subtract(2,1)).toBe(1);
        expect(subtract(10, 3)).toBe(7);
        expect(subtract(10, 10)).toBe(0);
      });
})
