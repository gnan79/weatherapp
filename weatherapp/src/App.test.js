import { render, screen } from '@testing-library/react'
import App from './App'
import { shallow } from 'enzyme'

describe('Test Search Button component', () => {
  it('Test click event', () => {
    const mockCallBack = jest.fn()

    const Button = shallow(
      <input type="Button" onClick={mockCallBack}>
        Search
      </input>,
    )
    button.find('Button').simulate('click')
    expect(mockCallBack.mock.calls.length).toEqual(1)
  })
})

test('renders Vroom Weather App', () => {
  render(<App />)
  const linkElement = screen.getByText(/Vroom Weather App/i)
  expect(linkElement).toBeInTheDocument()
})
