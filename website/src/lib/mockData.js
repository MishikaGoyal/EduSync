export const mockSchools = [
    {
      id: '1',
      name: 'JNANA JYOTHI CONVENT',
      resources: [
        {
          id: 'r1',
          name: 'Washroom',
          quantity: 2,
          description: '1 female washroom needed',
          requestTime: '2024-03-15 09:00',
          status: 'pending',
          reRequestCount: 0
        },
        {
          id: 'r2',
          name: 'Classroom',
          quantity: 2,
          description: 'needed two classroom for 8th standard ',
          requestTime: '2024-03-14 14:30',
          status: 'allocated',
          maxDeliveryDate: '2024-03-20',
          reRequestCount: 1
        }
      ]
    },
    {
      id: '2',
      name: 'VISHWA BHARATHI HIGH SCHOOL',
      resources: [
        {
          id: 'r3',
          name: 'Library Room',
          quantity: 1,
          description: 'need library',
          requestTime: '2024-03-13 11:20',
          status: 'allocated',
          maxDeliveryDate: '2024-03-18',
          reRequestCount: 0
        }
      ]
    }
  ];