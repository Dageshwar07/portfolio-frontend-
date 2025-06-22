import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from "../store/slices/counterSlice";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const ReduxCounter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Redux Counter Example</CardTitle>
        <CardDescription>
          Demonstrates Redux Toolkit state management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary">{count}</div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            onClick={() => dispatch(increment())}
            variant="default"
            size="sm"
          >
            +1
          </Button>

          <Button
            onClick={() => dispatch(decrement())}
            variant="outline"
            size="sm"
          >
            -1
          </Button>

          <Button
            onClick={() => dispatch(incrementByAmount(5))}
            variant="secondary"
            size="sm"
          >
            +5
          </Button>

          <Button
            onClick={() => dispatch(reset())}
            variant="destructive"
            size="sm"
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReduxCounter;
