---
title: Stop Mocking Internal; Start Mocking Your External
---

Modern software development practices have underscored the importance of testing as a cornerstone in the development process. As such, there has been a shift in emphasis from purely unit tests towards more integrated testing methods. A popular tool that emerged in sync with this trend is the React Testing Library (RTL), which provides a more realistic way to test React applications by focusing on their behaviour, not their implementation.

Traditionally, when testing web applications, we often resort to the practice of mocking internal objects and functions. For instance, we might mock the application's store, `window.fetch` and other dependencies within our app. While this method might be handy, it often results in brittle tests that fail to reflect how the application interacts with the outside world.

In this article, we propose a novel approach: stop mocking internal and start mocking your external. In other words, instead of mocking the internals of your application, you should set up a small test server that simulates your application's real-world interactions. 

## What is mocking internal logic?

Imagine we have a login form component that `POST`'s to an endpoint `/sessions` with a JSON body of `{ username, password }`.

To implement a test for a login form, we would utilize Jest along with React Testing Library (RTL). Below is an example test case where we're checking for an error message if a wrong username and password are entered.

```javascript
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { LoginForm } from '../components/LoginForm';
import * as Auth from '../services/auth';

jest.mock('../services/auth.ts', () => ({
  login: jest.fn()
}));

describe('LoginForm', () => {
  it('shows an error if the wrong username and password is entered', async () => {
    Auth.login.mockImplementation(() => Promise.reject());

    const { getByLabelText, getByRole, getByText } = render(<LoginForm />);
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByRole('button', { name: /submit/i });

    fireEvent.change(usernameInput, { target: { value: 'wrongUsername' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Invalid username or password')).toBeInTheDocument();
    });

    Auth.login.mockReset();
  });
});
```

In this example, we mock the `login` function from `auth.ts` to always reject, simulating a failed login attempt. We then render the `LoginForm`, enter incorrect username and password values, and click the submit button. We wait for the error message "Invalid username or password" to appear, validating that the application correctly handles incorrect login credentials. Finally, we reset the mock for further tests, ensuring isolation between tests.

## Why should we stop mocking internal?

Mocking internals can lead to tests becoming brittle and tightly coupled to the implementation. This happens because when we mock internal objects or functions, we inherently presume the inner workings of a function or module. If we refactor or restructure the system's internal logic, the tests may fail despite the public interface and the functionality remaining the same. As a result, our tests can become more of a hindrance than a safety net.

Moreover, internally mocked tests often fail to accurately simulate the real-world conditions in which the app operates. This can lead to misleading results as tests might pass despite the presence of bugs that would manifest under real conditions.

## Embrace External Mocking

Instead of internally mocking everything, consider mocking the boundaries of your application, i.e., its external dependencies. By doing this, you're not making assumptions about your code's internals; instead, you're simulating the interactions between your code and the rest of the world.

Setting up a small test server might initially seem like extra work, but it pays off by leading to more robust and meaningful tests. This server should simulate the same conditions that your application would face in the real world. For example, it might delay responses, deliver unexpected data, or fail to respond altogether, thereby ensuring that your application can handle all these scenarios.

Let's start by creating a small mock server generator function. We'll use `http.createServer` to create a mock server that responds to specific routes. The server listens on a port assigned by the operating system, preventing potential conflicts with other tests or processes.

```javascript
import http from 'http';

// This can be abstracted into your own helper file
function createMockServer(routes) {
  const server = http.createServer((req, res) => {
    const routeHandler = routes[req.url]?.[req.method];

    if (routeHandler) {
      routeHandler(req, res);
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  server.listen(0);
  return server;
}

// Example of creating a mock server
const server = createMockServer({
  '/sessions': {
    POST: (req, res) => {
      res.writeHead(201);
      res.end();
    },
  },
});

// Make sure to cleanup our server once test test finishes
server.close();
```

In this example, `createMockServer` is a function that sets up a server specifically for testing. It receives a `routes` object as an argument, which it uses to define the behavior of the server based on the incoming requests' URLs and methods. This server stands in for the real API and allows tests to interact with it as if it were the real thing. Once the tests are done, we close the server to clean up our test environment. 

By embracing this approach, you're effectively simulating the actual external interactions of your application, resulting in more robust and reliable tests.

### The internal mocking approach

Let's look back at our original internally mocked test. We used Jest to mock the `login` function to return a predefined response. This method involved creating assumptions about the internals of our codebase.

```javascript
jest.mock('../services/auth.ts', () => ({
  login: jest.fn()
}));

// ... Test setup and execution ...
```

In that example, we are mocking the `login` function to always reject, simulating a failed login attempt.

### The external mocking approach

Now, let's try the same with our proposed approach. This time, instead of mocking the `login` function, we will set up a mock server to simulate the real-world API interaction.

```javascript
import http from 'http';
import createMockServer from './helpers/createMockServer';

const mockInvalidUsernameOrPassword = () => {
  const server = createMockServer({
    '/sessions': {
      POST: (req, res) => {
        res.writeHead(401);
        res.end(JSON.stringify({ message: 'Invalid username or password' }));
      },
    },
  });
  const apiUrl = `http://localhost:${server.address().port}`;

  return {
    apiUrl,
    server
  }
}

describe('LoginForm', () => {
  it('shows an error if the wrong username and password is entered', async () => {
    const { apiUrl, server } = mockInvalidUsernameOrPassword();

    const { getByLabelText, getByRole, getByText } = render(
      <ApiContext.Provider value={{ apiUrl }}>
        <LoginForm />
      </ApiContext.Provider>
    );
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByRole('button', { name: /submit/i });

    fireEvent.change(usernameInput, { target: { value: 'wrongUsername' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Invalid username or password')).toBeInTheDocument();
    });

    server.close();
  });
});
```

## Benefits of External Mocking

External mocking brings multiple benefits to your testing strategy:

1. **Realistic Environment**: Tests run in an environment that closely mirrors the production environment, leading to more meaningful and reliable results. It ensures that your application's interactions with the backend are tested under conditions that accurately simulate actual user experiences.

2. **Fewer False Positives**: By not making assumptions about your code's internal behavior, you're less likely to have tests that pass despite the presence of bugs. Instead, you are testing the actual outcomes, which helps identify potential bugs and discrepancies that might not surface with internal mocking.

3. **Better Coverage**: By testing against a server, you naturally cover more of your codebase with each test. This not only includes the API interactions themselves but also how your app handles different server responses and network conditions.

4. **Flexibility**: With a dedicated server, you have full control over the conditions your tests face. You can simulate server errors, slow network conditions, different response formats, and other real-world situations to ensure your app handles them gracefully.

5. **Test the Unexpected**: A significant benefit of external mocking is the ability to test unexpected or erroneous conditions. You can configure your server to return unusual status codes, malformed data, or unexpected delays to test your app's robustness and error handling capabilities.

6. **Isolation**: When using a mock server, your tests become independent of any external factors. They are not affected by downtime, changing data, or rate limits from your real servers or third-party APIs.

7. **Consistency**: A mock server provides a consistent environment for your tests. You can reliably reproduce the same conditions over multiple test runs, which is not always the case with real servers where data might change between requests.

8. **Safety**: Using a mock server eliminates the risk of accidentally performing destructive operations on your real server during tests. For instance, your tests might create, modify, or delete data, and doing so on your real server could have unwanted effects.

These benefits make external mocking an essential tool for comprehensive, effective, and safe testing. However, we must remember that like any other approach, external mocking is not a silver bullet and does have its own challenges and potential drawbacks.

## Potential Downsides of External Mocking

While external mocking has significant benefits, it's also crucial to recognize potential drawbacks and understand when it may not be the best choice. Let's delve into some of these challenges:

1. **Increased Complexity**: Setting up an external mock server for your tests can be more complex and time-consuming than using simple internal mocks. You'll need to maintain a separate test server, and depending on your application's specifics, this could add substantial overhead to your testing process.

2. **Slower Tests**: When tests interact with a server, they can become slower due to the additional latency. This can lead to longer testing times, particularly in large-scale applications where thousands of tests might be running.

3. **Risk of Over Mocking**: When setting up a mock server, you might end up mocking more than necessary, creating an almost parallel development effort. Maintaining the mock server's behavior aligned with the actual server's behavior could also become a daunting task as your application grows.

4. **Increased Surface for Errors**: The act of building and maintaining a mock server itself can introduce errors. If there's a discrepancy between the behaviors of the real server and the test server, tests might pass or fail incorrectly.

Despite these downsides, the external mocking approach is a robust and effective way to simulate real-world conditions for your application during testing. The key lies in striking the right balance. Use external mocking for high-level integration and end-to-end tests where real-world conditions are crucial, and complement it with unit tests for individual components, where internal mocking or no mocking at all might be more appropriate. Remember, the goal of testing is to build confidence in your software, and different types of tests can contribute to that goal in different ways.
