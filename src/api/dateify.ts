export interface ResponseWithStrDates {
  createdAt: string;
  updatedAt: string;
}

export interface DateifiedResponse {
  createdAt: Date;
  updatedAt: Date;
}

export function dateifyResponse<
  R extends ResponseWithStrDates,
  D extends DateifiedResponse,
>(res: R): D {
  return {
    ...res,
    createdAt: new Date(res.createdAt),
    updatedAt: new Date(res.updatedAt),
  } as unknown as D;
}

export function sortResponsesByDate<R extends DateifiedResponse>(
  responses: R[],
  options: {
    useUpdate: boolean;
    recentFirst: boolean;
  } = {
    useUpdate: true,
    recentFirst: true,
  },
): R[] {
  const accessor = (x: R) =>
    options.useUpdate === false ? x.createdAt : x.updatedAt;
  return responses.slice().sort((a, b) => {
    if (options.recentFirst === false) {
      return accessor(a).getTime() - accessor(b).getTime();
    }
    return accessor(b).getTime() - accessor(a).getTime();
  });
}
