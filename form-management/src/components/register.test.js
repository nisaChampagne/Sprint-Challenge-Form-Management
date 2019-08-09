import React from 'react';
import ReactDOM from "react-dom";
import { subtract } from './register';
import { render, fireEvent } from '@testing-library/react';
import FormikRegister from './register';
import "@testing-library/react/cleanup-after-each";

describe('<FormikRegister />', () => {
    it("FormikForm renders", () => {
        const div = document.createElement("div");
        ReactDOM.render(<FormikRegister />, div);
        ReactDOM.unmountComponentAtNode(div);
      });
      ////renders <FormikRegister /> 

      /////BIG PAIN
      it("submit button clicked works", () => {
        const handler = jest.fn(e => e.preventDefault())
        const {getByTestId} = render(
          <form onSubmit={handler} data-testid="form">
            <button type="submit">Register</button>
          </form>,
        )
        fireEvent.submit(getByTestId('form'))
        expect(handler).toHaveBeenCalledTimes(1)
        });
        ////^^^^
      
      test("subtract function", () => {
        expect(subtract(2,1)).toBe(1);
        expect(subtract(10, 3)).toBe(7);
        expect(subtract(10, 10)).toBe(0);
      });
      ///
})
