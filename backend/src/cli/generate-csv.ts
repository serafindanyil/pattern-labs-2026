import * as fs from 'fs';
import * as path from 'path';

function generateCsv(filePath: string, numRows: number) {
  const header = [
    'email',
    'password',
    'fullName',
    'specializationTitle',
    'specializationDescription',
    'courseTitle',
    'subscriptionTitle',
    'subscriptionType',
    'subscriptionPrice',
    'enrolledAt',
  ].join(',');

  const rows = [header];
  const specializations = [
    { title: 'DevOps Engineer', description: 'Deploy and scale robust apps' },
    { title: 'Data Scientist', description: 'Learn data analysis and ML' },
    { title: 'Full Stack Web Dev', description: 'React and Nodejs masterclass' }
  ];

  const subscriptions = [
    { title: 'Basic', type: 'Monthly', price: 9.99 },
    { title: 'Premium', type: 'Lifetime', price: 299.99 }
  ];

  for (let i = 1; i <= numRows; i++) {
    const email = `learner${i}@example.com`;
    const password = `pass${i}`;
    const fullName = `Learner Name ${i}`;

    const spec = specializations[i % specializations.length];
    const sub = subscriptions[i % subscriptions.length];
    
    const courseTitle = `Course Module ${i}`;
    const enrolledAt = new Date().toISOString();

    rows.push(
      [
        email,
        password,
        fullName,
        spec.title,
        spec.description,
        courseTitle,
        sub.title,
        sub.type,
        sub.price,
        enrolledAt,
      ].join(',')
    );
  }

  fs.writeFileSync(filePath, rows.join('\n'), 'utf8');
  console.log(`Generated ${numRows} rows in ${filePath}`);
}

const targetPath = path.resolve(__dirname, '../../data.csv');
generateCsv(targetPath, 1050);
