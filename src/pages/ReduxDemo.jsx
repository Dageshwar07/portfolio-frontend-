import React from "react";
import ReduxCounter from "../components/ReduxCounter";
import UserManager from "../components/UserManager";

const ReduxDemo = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Redux Toolkit Demo</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This page demonstrates Redux Toolkit integration with counter and
            user management examples. Redux Toolkit provides a modern way to
            write Redux logic with less boilerplate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ReduxCounter />
          <UserManager />
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Redux Toolkit Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">🛠️ What's Included:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Redux store configuration</li>
                  <li>• Counter slice with actions</li>
                  <li>• User management slice</li>
                  <li>• Typed hooks for TypeScript support</li>
                  <li>• Example components</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📁 File Structure:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• src/store/store.js</li>
                  <li>• src/store/slices/counterSlice.js</li>
                  <li>• src/store/slices/userSlice.js</li>
                  <li>• src/store/hooks.js</li>
                  <li>• src/components/ReduxCounter.jsx</li>
                  <li>• src/components/UserManager.jsx</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReduxDemo;
