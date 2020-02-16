import React from "react";
import { shallow } from "enzyme";
import SearchInput from "../components/SearchInput";

const TEST = {
  ID: "test-id",
  NAME: "test-name",
  LABEL: "test-label",
  PLACEHOLD: "test-placehold",
  VALUE: "test-value"
};

describe("<SearchInput />", () => {
  let wrapper;
  let input;
  let label;

  const changeHandlerMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <SearchInput
        id={TEST.ID}
        name={TEST.NAME}
        label={TEST.LABEL}
        onChange={changeHandlerMock}
        placeholder={TEST.PLACEHOLD}
        value={TEST.VALUE}
      />
    );
    input = wrapper.find("input");
    label = wrapper.find("label");
  });

  it("contains a text <input />", () => {
    expect(input.length).toEqual(1);
    expect(input.props().type).toEqual("text");
  });

  it("should have an id & corresponding label for screenreaders", () => {
    expect(input.props().id).toEqual(TEST.ID);
    expect(label.props().htmlFor).toEqual(TEST.ID);
  });

  it('should display a label', () => {
    expect(label.text()).toEqual(TEST.LABEL);
  })

  it("should display a placeholder", () => {
    expect(input.props().placeholder).toEqual(TEST.PLACEHOLD);
  });

  it("should display the value prop", () => {
    expect(input.props().value).toEqual(TEST.VALUE);
  });

  // TODO: Test focus state
  // This is not essential as the required behaviour is browser default
  // it('should focus on the input element when clicked', async () => {
  //   expect(document.activeElement).toEqual(input);
  // });

  it("should fire onChange prop when value changes", () => {
    const event = {
      preventDefault() {},
      target: {
        value: "testValue"
      }
    };

    input.simulate("change", event);
    expect(changeHandlerMock).toHaveBeenCalledWith("testValue");
  });
});
