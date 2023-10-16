1. `npm install`

2. `npm run dev`

3. Check out the cool `<Tabs>` from build on react-aria at `localhost:3000`

4. Run `npx tsc`

5. Observe the TypeScript compile error:

```
$ npx tsc
node_modules/react-aria/dist/types.d.ts:46:35 - error TS2305: Module '"@react-aria/utils"' has no exported member 'RouterProvider'.

46 export {chain, mergeProps, useId, RouterProvider} from '@react-aria/utils';
                                     ~~~~~~~~~~~~~~
Found 1 error in node_modules/react-aria/dist/types.d.ts:46
```
