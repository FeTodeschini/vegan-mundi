import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import SearchInput from '../app/_components/SearchInput';
import StateProvider from '../app/StateProvider';

// Create a mock router
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

// Create a mock function for the router's push method
const mockPush = jest.fn();

//  Function for rendering SearchInput
function renderSearchInput() {
    // Import the mocked useRouter. Require (instead of import) needs to be used to access it dynamically and make sure that the mocked version is returned
    const { useRouter } = require('next/navigation');

    // Mock the behavior of useRouter to return the mock push method
    useRouter.mockReturnValue({ push: mockPush });

    render(
        <StateProvider>
            <SearchInput placeholder='unit test'/>
        </StateProvider>
    );
}

test('calls search page with typed keyword when user presses enter', async () => {
    renderSearchInput();

    const input = screen.getByRole('textbox');
    await user.type(input, 'coconut{enter}');

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/search?keyword=coconut'));

});

test('calls search page with typed keyword when user clicks magnifying glass', async () => {
    renderSearchInput();

    const input = screen.getByRole('textbox');
    await user.type(input, 'coconut');

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/search?keyword=coconut'));

});

test('does not call search page if keyword lenght is less than 3 characters', async () => {
    renderSearchInput();

    const input = screen.getByRole('textbox');
    await user.type(input, 'coc{enter}');

    await waitFor(() => expect(mockPush).not.toHaveBeenCalledWith('/search?keyword=coconut'));
});