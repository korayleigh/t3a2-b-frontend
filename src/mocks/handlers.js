import {rest} from 'msw';

export const handlers = [
  // user sign in
  rest.post('/api/users/sign_in', (req,res,ctx) => {
    sessionStorage.setItem('is-authenticated', 'true');
    return res(
      // respond with 200 status code
      ctx.status(200),
      // response with json body
      ctx.json({
        'email': 'admin@mexiqui.to',
        'role': 'Admin',
        'message': 'Successfully logged in.'
      })
    );
  }),
  // user sign out
  rest.delete('/api/users/sign_out',(req,res,ctx) => {
    sessionStorage.setItem('is-authenticated', 'false');
    return res(
      // response with 200 status code
      ctx.status(200),
      // response with json body
      ctx.json({
        'message': 'Successfully logged out.'
      })
    );

  }),
];

